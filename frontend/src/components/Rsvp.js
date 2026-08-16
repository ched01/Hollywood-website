import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Check, ArrowRight } from "lucide-react";
import { Reveal, Overline } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Rsvp() {
    const [form, setForm] = useState({ name: "", email: "", guests: 1 });
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [count, setCount] = useState(null);

    useEffect(() => {
        axios.get(`${API}/rsvp/count`).then((r) => setCount(r.data)).catch(() => {});
    }, [done]);

    const submit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post(`${API}/rsvp`, form);
            setDone(true);
            toast.success("Your request is with the Academy office.");
        } catch (err) {
            toast.error(err.response?.data?.detail?.[0]?.msg || "Something went wrong — please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const inputCls =
        "w-full bg-transparent border-0 border-b border-white/25 focus:border-gold focus:ring-0 outline-none px-0 py-3 text-lg font-light text-white placeholder:text-white/30 transition-colors duration-500";

    return (
        <section id="rsvp" data-testid="rsvp-section" className="relative bg-night-deep px-6 sm:px-12 lg:px-20 py-28 sm:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
                <Reveal>
                    <Overline>Tickets & RSVP</Overline>
                    <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02]">
                        Request your<br /><em className="text-gold">place in the dark.</em>
                    </h2>
                    <p className="mt-8 max-w-md text-base font-light leading-relaxed text-white/60">
                        Ceremony seating is by invitation of the Academy. Register your interest and
                        the office will respond as allocations open.
                    </p>
                    {count && (
                        <p data-testid="rsvp-count" className="mt-10 font-display text-2xl italic text-gold/90">
                            {count.seats.toLocaleString()} seats already requested.
                        </p>
                    )}
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
                                    <p className="font-display text-3xl sm:text-4xl">Consider it noted in gold ink.</p>
                                    <p className="text-sm font-light text-white/60 leading-relaxed">
                                        We've received your request, {form.name.split(" ")[0]}. Watch your inbox as
                                        seating allocations open.
                                    </p>
                                    <button
                                        data-testid="rsvp-again-button"
                                        onClick={() => { setDone(false); setForm({ name: "", email: "", guests: 1 }); }}
                                        className="text-[11px] tracking-[0.3em] uppercase text-gold link-underline"
                                    >
                                        Submit another request
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
                                    <div>
                                        <label htmlFor="rsvp-name" className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Full name</label>
                                        <input
                                            id="rsvp-name"
                                            data-testid="rsvp-name-input"
                                            required
                                            minLength={2}
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="Grace Kelly"
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="rsvp-email" className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Email</label>
                                        <input
                                            id="rsvp-email"
                                            data-testid="rsvp-email-input"
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="you@studio.com"
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <span className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Seats</span>
                                        <div className="mt-4 flex gap-3">
                                            {[1, 2, 3, 4].map((n) => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    data-testid={`rsvp-guests-${n}`}
                                                    onClick={() => setForm({ ...form, guests: n })}
                                                    className={`h-11 w-11 border font-display text-lg transition-all duration-400 ${
                                                        form.guests === n
                                                            ? "border-gold bg-gold text-night-deep"
                                                            : "border-white/20 text-white/60 hover:border-gold/60 hover:text-gold"
                                                    }`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        data-testid="rsvp-submit-button"
                                        type="submit"
                                        disabled={submitting}
                                        className="group relative w-full overflow-hidden border border-gold/60 py-4 text-xs tracking-[0.3em] uppercase text-gold transition-colors duration-500 hover:text-night-deep disabled:opacity-50"
                                    >
                                        <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                                        <span className="relative flex items-center justify-center gap-3">
                                            {submitting ? "Sealing the envelope…" : "Request invitation"}
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
