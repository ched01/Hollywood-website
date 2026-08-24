import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Statuette3D from "./Statuette3D";

const EASE = [0.16, 1, 0.3, 1];

const MaskedLine = ({ children, delay, className = "" }) => (
    <span className={`block overflow-hidden ${className}`}>
        <motion.span
            className="block"
            initial={{ y: "112%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, delay, ease: EASE }}
        >
            {children}
        </motion.span>
    </span>
);

export default function Hero({ onNavigate }) {
    const { scrollYProgress } = useScroll();
    const canvasY = useTransform(scrollYProgress, [0, 0.25], [0, 180]);
    const canvasOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.15]);
    const bgWordY = useTransform(scrollYProgress, [0, 0.25], [0, -120]);

    return (
        <section id="home" data-testid="hero-section" className="relative min-h-screen overflow-hidden bg-night">
            <motion.div
                style={{ y: bgWordY }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                aria-hidden="true"
            >
                <span className="font-display font-semibold text-outline-faint text-[19vw] leading-none tracking-tight whitespace-nowrap">
                    HOLLYWOOD
                </span>
            </motion.div>

            <motion.div style={{ y: canvasY, opacity: canvasOpacity }} className="absolute inset-0 z-[5]">
                <Statuette3D />
            </motion.div>

            <div className="absolute inset-0 z-[6] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,14,23,0.75)_100%)]" />

            <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-28 sm:px-12 lg:px-20 pointer-events-none">
                <div className="max-w-5xl">
                    <MaskedLine delay={0.15}>
                        <span className="text-xs sm:text-sm tracking-[0.45em] uppercase text-gold font-body">
                            Une soirée en l'honneur de Lavinia · 03 . 10 . 2026
                        </span>
                    </MaskedLine>
                    <h1 className="mt-6 font-display font-medium leading-[0.92] tracking-tighter text-6xl sm:text-8xl lg:text-[9rem]">
                        <MaskedLine delay={0.3}>Once upon a time</MaskedLine>
                        <MaskedLine delay={0.45}>
                            in <em className="text-gold gold-glow font-semibold">Hollywood.</em>
                        </MaskedLine>
                    </h1>
                    <MaskedLine delay={0.65} className="mt-8 max-w-xl">
                        <span className="text-base sm:text-lg font-light text-white/70 leading-relaxed">
                            Tapis rouge, dîner de gala, remise de prix et dancefloor —
                            une nuit en or, tout simplement.
                        </span>
                    </MaskedLine>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.9, ease: EASE }}
                        className="mt-10 flex flex-wrap items-center gap-5 pointer-events-auto"
                    >
                        <button
                            data-testid="hero-rsvp-button"
                            onClick={() => onNavigate("#rsvp")}
                            className="group relative overflow-hidden border border-gold/60 px-8 py-4 text-xs tracking-[0.3em] uppercase text-gold transition-colors duration-500 hover:text-night-deep"
                        >
                            <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                            <span className="relative">Confirmer ma présence</span>
                        </button>
                        <button
                            data-testid="hero-invitation-button"
                            onClick={() => onNavigate("#invitation")}
                            className="link-underline text-xs tracking-[0.3em] uppercase text-white/70 hover:text-gold transition-colors duration-300 py-4"
                        >
                            Lire l'invitation
                        </button>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="absolute bottom-8 right-8 sm:right-14 z-10 flex flex-col items-center gap-3 text-white/40"
            >
                <span className="text-[10px] tracking-[0.35em] uppercase rotate-90 origin-center translate-y-[-8px]">Défiler</span>
                <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
                    <ChevronDown size={16} strokeWidth={1.5} />
                </motion.span>
            </motion.div>
        </section>
    );
}
