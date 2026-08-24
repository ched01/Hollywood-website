from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import httpx
import jwt
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

# Emergent managed email proxy — constant, never from env
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
JWT_SECRET = os.environ["JWT_SECRET"]
HOST_PASSWORD = os.environ["HOST_PASSWORD"]

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to:
        payload["contact_email"] = reply_to
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


def build_confirmation_email(rsvp: "Rsvp") -> tuple[str, str]:
    name = escape(rsvp.first_name)
    attending_html = (
        '<p style="margin:0;font-size:15px;color:#f3e5ab">Présent(e) — le tapis rouge vous attend.</p>'
        if rsvp.attending else
        '<p style="margin:0;font-size:15px;color:#f3e5ab">Absent(e) — vous nous manquerez, et Lavinia le saura.</p>'
    )
    regime = "Végétarien" if rsvp.vegetarian else "Classique"
    message_row = ""
    if rsvp.message:
        message_row = (
            f'<tr><td style="padding:6px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d4af37">Votre mot</td>'
            f'<td style="padding:6px 0;font-size:14px;color:#ffffff;font-style:italic">{escape(rsvp.message)}</td></tr>'
        )
    subject = "Votre réponse est scellée à l'or — Once Upon a Time in Hollywood"
    html = f'''<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0e17;padding:40px 16px">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#131a2c;border:1px solid #d4af37">
<tr><td style="padding:36px 40px;border-bottom:1px solid rgba(212,175,55,0.3)">
  <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:22px;color:#d4af37;letter-spacing:1px">Once Upon a Time in Hollywood</p>
  <p style="margin:8px 0 0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.5)">Une soirée en l'honneur de Lavinia</p>
</td></tr>
<tr><td style="padding:32px 40px;font-family:Georgia,serif;color:#ffffff">
  <p style="margin:0 0 16px;font-size:16px">Cher(ère) {name},</p>
  <p style="margin:0 0 20px;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.75)">Votre réponse est bien arrivée, notée à l'encre d'or dans le registre de la soirée.</p>
  {attending_html}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;border-top:1px solid rgba(212,175,55,0.3);border-bottom:1px solid rgba(212,175,55,0.3)">
    <tr><td style="padding:14px 0 6px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d4af37">Réponse</td>
        <td style="padding:14px 0 6px;font-size:14px;color:#ffffff">{"Présent(e)" if rsvp.attending else "Absent(e)"}</td></tr>
    <tr><td style="padding:6px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d4af37">Régime</td>
        <td style="padding:6px 0;font-size:14px;color:#ffffff">{regime}</td></tr>
    {message_row}
    <tr><td colspan="2" style="padding-bottom:10px"></td></tr>
  </table>
  <p style="margin:0;font-size:14px;line-height:1.8;color:rgba(255,255,255,0.75)">
    Le 03 octobre 2026 à 20h<br/>
    Le Piesmont — Allée des Grands Clos 8, 1380 Lasne<br/>
    <span style="color:#d4af37">Dress code :</span> robe longue pour elle, black tie pour lui
  </p>
</td></tr>
<tr><td style="padding:20px 40px;border-top:1px solid rgba(212,175,55,0.3)">
  <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:1px">Une invitation de la famille Cox — Once Upon a Time in Hollywood</p>
</td></tr>
</table>
</td></tr>
</table>'''
    return subject, html


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class Rsvp(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    last_name: str
    email: EmailStr
    attending: bool
    vegetarian: bool = False
    message: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class RsvpCreate(BaseModel):
    first_name: str = Field(min_length=1, max_length=60)
    last_name: str = Field(min_length=1, max_length=60)
    email: EmailStr
    attending: bool
    vegetarian: bool = False
    message: Optional[str] = Field(default="", max_length=600)


class HostLogin(BaseModel):
    password: str


def create_host_token() -> str:
    payload = {"type": "host", "exp": datetime.now(timezone.utc) + timedelta(hours=12)}
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


async def require_host(request: Request):
    auth = request.headers.get("Authorization", "")
    token = auth[7:] if auth.startswith("Bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="Non autorisé")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        if payload.get("type") != "host":
            raise HTTPException(status_code=401, detail="Jeton invalide")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Jeton invalide")


@api_router.get("/")
async def root():
    return {"message": "Once Upon a Time in Hollywood — API"}


@api_router.post("/rsvp", response_model=Rsvp)
async def create_rsvp(input: RsvpCreate):
    rsvp = Rsvp(**input.model_dump())
    doc = rsvp.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.rsvps.insert_one(doc)
    try:
        subject, html = build_confirmation_email(rsvp)
        await send_email(to=rsvp.email, subject=subject, html=html)
    except Exception:
        logger.exception("RSVP confirmation email failed")
    return rsvp


@api_router.get("/rsvp/count")
async def rsvp_count():
    count = await db.rsvps.count_documents({"attending": True})
    return {"attending": count}


@api_router.post("/host/login")
async def host_login(input: HostLogin, request: Request):
    identifier = request.client.host if request.client else "unknown"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("count", 0) >= 5:
        last = attempt.get("last_attempt")
        if last and datetime.now(timezone.utc) - datetime.fromisoformat(last) < timedelta(minutes=15):
            raise HTTPException(status_code=429, detail="Trop de tentatives — réessayez dans 15 minutes.")
    import hmac
    if not hmac.compare_digest(input.password, HOST_PASSWORD):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1}, "$set": {"last_attempt": datetime.now(timezone.utc).isoformat()}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")
    await db.login_attempts.delete_one({"identifier": identifier})
    return {"token": create_host_token()}


@api_router.get("/host/rsvps")
async def host_rsvps(_=Depends(require_host)):
    docs = await db.rsvps.find(
        {"first_name": {"$exists": True}},
        {"_id": 0},
    ).sort("created_at", -1).to_list(5000)
    stats = {
        "present": sum(1 for d in docs if d.get("attending")),
        "absent": sum(1 for d in docs if not d.get("attending")),
        "vegetarian": sum(1 for d in docs if d.get("vegetarian")),
    }
    return {"responses": docs, "stats": stats}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
