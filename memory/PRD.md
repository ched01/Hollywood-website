# PRD — Oscars 2026: The 98th Academy Awards (3D Concept Microsite)

## Original Problem Statement
"Build a visually stunning 3D website for the 2026 oscars ceremony" — refined to: Awwwards-level full ceremony experience + event promo, react-three-fiber golden statuette centerpiece, classic Oscars glamour in black + gold with night blue #131a2c, kinetic hero with masked line reveal, numbered manifesto chapters, slow editorial marquee, framer-motion reveals, lenis smooth scrolling.

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll) + @react-three/fiber + @react-three/drei (procedural 3D statuette, Lightformer env — no external HDR/models).
- Backend: FastAPI + MongoDB (motor). RSVP endpoints only.
- Key files: `/app/frontend/src/App.js`, `components/{Hero,Statuette3D,Countdown,Marquee,Manifesto,Nominees,Gallery,Venue,Rsvp,Footer,Nav,Reveal}.js`, `data/content.js`, `/app/backend/server.py`, `/app/design_guidelines.json`.

## User Personas
- Film fan exploring contenders and the red carpet gallery.
- Industry guest requesting ceremony seating (RSVP).
- Press/visitor checking date, venue, broadcast info.

## Core Requirements (static)
- Cinematic dark theme (#131a2c / #0a0e17 / gold #d4af37), Cormorant Garamond + Manrope, film grain overlay.
- Hero: 3D golden statuette, masked line-by-line reveal, parallax on scroll, giant outline "OSCARS" backdrop.
- Countdown to March 15, 2026 17:00 PT (graceful "history books" state once passed).
- Editorial marquee, manifesto chapters 01–03, contenders tabs (curated shortlist), tetris red-carpet gallery, venue facts, RSVP → MongoDB.

## Implemented (2026-08-16)
- All sections above; backend POST /api/rsvp + GET /api/rsvp/count; live seat counter in UI; sonner toasts; full data-testid coverage.
- Verified: RSVP API (curl), UI submit flow end-to-end, category tabs, gallery rendering, hero 3D canvas.

## Notes
- Nominees are a CURATED shortlist (labeled as such), not official Academy nominations.
- Countdown shows the post-ceremony state when viewed after March 15, 2026 (sandbox clock is past the date).
- PostHog snippet in index.html throws a harmless console error (platform boilerplate, pre-existing).

## Backlog / Next Tasks
- P1: Winners reveal mode (post-ceremony results per category).
- P1: Trailer/teaser video section (event promo).
- P2: Red carpet gallery lightbox + more photography.
- P2: RSVP confirmation email (Resend integration).
- P2: Multi-language / press-kit download.
