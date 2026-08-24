import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Lock, Download, Copy, LogOut, ArrowLeft } from "lucide-react";
import { Overline } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
    "w-full bg-transparent border-0 border-b border-white/25 focus:border-gold focus:ring-0 outline-none px-0 py-3 text-lg font-light text-white placeholder:text-white/30 transition-colors duration-500";

export default function Hosts() {
    const [token, setToken] = useState(() => sessionStorage.getItem("host_token") || "");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const fetchList = async (t) => {
        try {
            const res = await axios.get(`${API}/host/rsvps`, { headers: { Authorization: `Bearer ${t}` } });
            setData(res.data);
        } catch {
            sessionStorage.removeItem("host_token");
            setToken("");
            setData(null);
        }
    };

    useEffect(() => {
        if (token) fetchList(token);
    }, [token]);

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${API}/host/login`, { password });
            sessionStorage.setItem("host_token", res.data.token);
            setToken(res.data.token);
        } catch (err) {
            toast.error(err.response?.data?.detail || "Mot de passe incorrect");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        sessionStorage.removeItem("host_token");
        setToken("");
        setData(null);
        setPassword("");
    };

    const exportCsv = () => {
        const rows = [["Prénom", "Nom", "E-mail", "Réponse", "Régime", "Mot", "Date"]];
        data.responses.forEach((r) => rows.push([
            r.first_name, r.last_name, r.email,
            r.attending ? "Présent(e)" : "Absent(e)",
            r.vegetarian ? "Végétarien" : "Classique",
            (r.message || "").replace(/[\r\n]+/g, " "),
            new Date(r.created_at).toLocaleString("fr-BE"),
        ]));
        const csv = rows.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\n");
        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "reponses-gala.csv";
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const copyEmails = () => {
        const emails = data.responses.filter((r) => r.attending).map((r) => r.email).join(", ");
        navigator.clipboard.writeText(emails).then(() => toast.success("E-mails copiés."));
    };

    return (
        <div data-testid="hosts-page" className="min-h-screen bg-night-deep text-white font-body px-6 sm:px-12 lg:px-20 py-10">
            <div className="grain-overlay" aria-hidden="true" />
            <div className="flex items-center justify-between">
                <p className="font-display italic text-2xl tracking-wide text-gold">
                    Hollywood <span className="not-italic text-white/60 text-sm align-super">'26</span>
                </p>
                <Link
                    data-testid="hosts-back-link"
                    to="/"
                    className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-white/50 hover:text-gold transition-colors duration-300"
                >
                    <ArrowLeft size={13} strokeWidth={1.5} /> Retour au site
                </Link>
            </div>

            {!token ? (
                <div className="flex items-center justify-center min-h-[70vh]">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-md bg-night/60 backdrop-blur-2xl border border-gold/20 p-8 sm:p-12"
                    >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold mb-8">
                            <Lock size={18} strokeWidth={1.5} />
                        </span>
                        <Overline>Espace des hôtes</Overline>
                        <h1 className="mt-3 font-display text-3xl sm:text-4xl tracking-tight">
                            Le registre <em className="text-gold">d'or.</em>
                        </h1>
                        <form data-testid="hosts-login-form" onSubmit={login} className="mt-10 space-y-8">
                            <div>
                                <label htmlFor="host-password" className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Mot de passe</label>
                                <input
                                    id="host-password"
                                    data-testid="hosts-password-input"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className={inputCls}
                                />
                            </div>
                            <button
                                data-testid="hosts-login-button"
                                type="submit"
                                disabled={loading}
                                className="group relative w-full overflow-hidden border border-gold/60 py-4 text-xs tracking-[0.3em] uppercase text-gold transition-colors duration-500 hover:text-night-deep disabled:opacity-50"
                            >
                                <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                                <span className="relative">{loading ? "Ouverture…" : "Entrer"}</span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-14"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div>
                            <Overline>Espace des hôtes</Overline>
                            <h1 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">
                                Les réponses <em className="text-gold">des invités.</em>
                            </h1>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button data-testid="hosts-export-csv" onClick={exportCsv} disabled={!data}
                                className="inline-flex items-center gap-2 border border-gold/60 px-5 py-3 text-[11px] tracking-[0.25em] uppercase text-gold hover:bg-gold hover:text-night-deep transition-colors duration-400 disabled:opacity-40">
                                <Download size={13} strokeWidth={1.5} /> Exporter en CSV
                            </button>
                            <button data-testid="hosts-copy-emails" onClick={copyEmails} disabled={!data}
                                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-[11px] tracking-[0.25em] uppercase text-white/70 hover:border-gold/60 hover:text-gold transition-colors duration-400 disabled:opacity-40">
                                <Copy size={13} strokeWidth={1.5} /> Copier les e-mails
                            </button>
                            <button data-testid="hosts-logout-button" onClick={logout}
                                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-[11px] tracking-[0.25em] uppercase text-white/50 hover:text-gold transition-colors duration-400">
                                <LogOut size={13} strokeWidth={1.5} /> Quitter
                            </button>
                        </div>
                    </div>

                    {data && (
                        <div data-testid="hosts-stats" className="mt-10 flex flex-wrap gap-10">
                            <div><span className="font-display text-4xl text-gold gold-glow tabular-nums">{data.stats.present}</span>
                                <span className="block mt-1 text-[10px] tracking-[0.3em] uppercase text-white/50">Présents</span></div>
                            <div><span className="font-display text-4xl text-white/70 tabular-nums">{data.stats.absent}</span>
                                <span className="block mt-1 text-[10px] tracking-[0.3em] uppercase text-white/50">Absents</span></div>
                            <div><span className="font-display text-4xl text-white/70 tabular-nums">{data.stats.vegetarian}</span>
                                <span className="block mt-1 text-[10px] tracking-[0.3em] uppercase text-white/50">Végétariens</span></div>
                        </div>
                    )}

                    <div className="mt-10 overflow-x-auto border border-white/10" data-testid="hosts-table-wrapper">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gold/25 text-left text-[10px] tracking-[0.3em] uppercase text-gold/80">
                                    <th className="px-4 py-4 font-normal">Invité</th>
                                    <th className="px-4 py-4 font-normal">E-mail</th>
                                    <th className="px-4 py-4 font-normal">Réponse</th>
                                    <th className="px-4 py-4 font-normal">Régime</th>
                                    <th className="px-4 py-4 font-normal">Mot</th>
                                    <th className="px-4 py-4 font-normal">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/8">
                                {data?.responses.map((r) => (
                                    <tr key={r.id} data-testid={`hosts-row-${r.id}`} className="hover:bg-white/[0.03] transition-colors duration-300">
                                        <td className="px-4 py-4 font-display text-lg">{r.first_name} {r.last_name}</td>
                                        <td className="px-4 py-4 text-white/60 font-light">{r.email}</td>
                                        <td className="px-4 py-4">
                                            <span className={r.attending ? "text-gold" : "text-white/40"}>
                                                {r.attending ? "Présent(e)" : "Absent(e)"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-white/60 font-light">{r.vegetarian ? "Végétarien" : "Classique"}</td>
                                        <td className="px-4 py-4 text-white/50 font-light italic max-w-[220px] truncate">{r.message || "—"}</td>
                                        <td className="px-4 py-4 text-white/40 font-light whitespace-nowrap">
                                            {new Date(r.created_at).toLocaleDateString("fr-BE", { day: "2-digit", month: "short" })}
                                        </td>
                                    </tr>
                                ))}
                                {data && data.responses.length === 0 && (
                                    <tr><td colSpan={6} className="px-4 py-12 text-center text-white/40 font-light italic">
                                        Le registre est encore vierge — les premières réponses ne tarderont pas.
                                    </td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
