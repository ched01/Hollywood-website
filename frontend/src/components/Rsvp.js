import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Check, ArrowRight } from "lucide-react";
import { Reveal, Overline } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INITIAL = { first_name: "", last_name: "", email: "", attending: true, vegetarian: false, message: "" };

export default function Rsvp() {
    const [form, setForm] = useState(INITIAL);
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post(`${API}/rsvp`, form);
            setDone(true);
            toast.success("Votre réponse est bien arrivée.");
        } catch (err) {
            toast.error(err.response?.data?.detail?.[0]?.msg || "Une erreur est survenue — veuillez réessayer.");
        } finally {
            setSubmitting(false);
        }
    };

    const inputCls =
        "w-full bg-transparent border-0 border-b border-white/25 focus:border-gold focus:ring-0 outline-none px-0 py-3 text-lg font-light text-white placeholder:text-white/30 transition-colors duration-500";

    const choiceCls = (active) =>
        `px-5 py-3 text-[11px] tracking-[0.2em] uppercase border transition-all duration-500 ${
            active
                ? "border-gold bg-gold text-night-deep"
                : "border-white/20 text-white/60 hover:border-gold/60 hover:text-gold"
        }`;

    return (
        <section id="rsvp" data-testid="rsvp-section" className="relative bg-night-deep px-6 sm:px-12 lg:px-20 py-28 sm:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
                <Reveal>
                    <Overline>RSVP</Overline>
                    <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02]">
                        Confirmez<br /><em className="text-gold">votre venue.</em>
                    </h2>
                    <p className="mt-8 max-w-md text-base font-light leading-relaxed text-white/60">
                        Une réponse, un mot pour les hôtes si le cœur vous en dit —
                        et le tapis rouge n'aura plus qu'à vous attendre.
                    </p>
                    <p className="mt-10 font-display text-xl italic text-gold/80">
                        Merci de répondre avant le 12 septembre 2026.
                    </p>
                </Reveal>

                <Reveal delay={0.12}>
                    <div className="relative bg-night/60 backdrop-blur-2xl border border-gold/20 p-8 sm:p-12">
                        <AnimatePresence mode="wait">
                            {done ? (
                                <motion.div
                                    key="done"
                                    data-testid="rsvp-success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-col items-start gap-6 py-10"
                                >
                                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
                                        <Check size={22} strokeWidth={1.5} />
                                    </span>
                                    <p className="font-display text-3xl sm:text-4xl">Votre réponse est scellée à l'or.</p>
                                    <p className="text-sm font-light text-white/60 leading-relaxed">
                                        {form.attending
                                            ? `Merci ${form.first_name} — le tapis rouge vous attend le 3 octobre.`
                                            : `Merci ${form.first_name} — vous nous manquerez, et Lavinia le saura.`}
                                    </p>
                                    <button
                                        data-testid="rsvp-again-button"
                                        onClick={() => { setDone(false); setForm(INITIAL); }}
                                        className="text-[11px] tracking-[0.3em] uppercase text-gold link-underline"
                                    >
                                        Répondre pour un autre invité
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    data-testid="rsvp-form"
                                    onSubmit={submit}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    className="space-y-10"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div>
                                            <label htmlFor="rsvp-firstname" className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Prénom</label>
                                            <input
                                                id="rsvp-firstname"
                                                data-testid="rsvp-firstname-input"
                                                required
                                                value={form.first_name}
                                                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                                                placeholder="Grace"
                                                className={inputCls}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="rsvp-lastname" className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Nom</label>
                                            <input
                                                id="rsvp-lastname"
                                                data-testid="rsvp-lastname-input"
                                                required
                                                value={form.last_name}
                                                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                                                placeholder="Kelly"
                                                className={inputCls}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="rsvp-email" className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Adresse e-mail</label>
                                        <input
                                            id="rsvp-email"
                                            data-testid="rsvp-email-input"
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="vous@exemple.com"
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <span className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Votre réponse</span>
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                data-testid="rsvp-attending-yes"
                                                onClick={() => setForm({ ...form, attending: true })}
                                                className={choiceCls(form.attending)}
                                            >
                                                Présent(e)
                                            </button>
                                            <button
                                                type="button"
                                                data-testid="rsvp-attending-no"
                                                onClick={() => setForm({ ...form, attending: false })}
                                                className={choiceCls(!form.attending)}
                                            >
                                                Absent(e)
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Régime alimentaire</span>
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                data-testid="rsvp-diet-classic"
                                                onClick={() => setForm({ ...form, vegetarian: false })}
                                                className={choiceCls(!form.vegetarian)}
                                            >
                                                Je ne suis pas végétarien(ne)
                                            </button>
                                            <button
                                                type="button"
                                                data-testid="rsvp-diet-vegetarian"
                                                onClick={() => setForm({ ...form, vegetarian: true })}
                                                className={choiceCls(form.vegetarian)}
                                            >
                                                Je suis végétarien(ne)
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="rsvp-message" className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Un mot pour les hôtes</label>
                                        <textarea
                                            id="rsvp-message"
                                            data-testid="rsvp-message-input"
                                            rows={3}
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            placeholder="Quelques mots, si le cœur vous en dit…"
                                            className={`${inputCls} resize-none`}
                                        />
                                    </div>
                                    <button
                                        data-testid="rsvp-submit-button"
                                        type="submit"
                                        disabled={submitting}
                                        className="group relative w-full overflow-hidden border border-gold/60 py-4 text-xs tracking-[0.3em] uppercase text-gold transition-colors duration-500 hover:text-night-deep disabled:opacity-50"
                                    >
                                        <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                                        <span className="relative flex items-center justify-center gap-3">
                                            {submitting ? "Cachetage de l'enveloppe…" : "Confirmer ma réponse"}
                                            <ArrowRight size={14} strokeWidth={1.5} />
                                        </span>
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
