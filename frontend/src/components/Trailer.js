import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { Reveal, Overline } from "./Reveal";
import { TEASER_POSTER } from "@/data/content";

export default function Trailer() {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const toggle = async () => {
        const v = videoRef.current;
        if (!v) return;
        if (playing) {
            v.pause();
            setPlaying(false);
        } else {
            try {
                await v.play();
                setPlaying(true);
            } catch {}
        }
    };

    return (
        <section data-testid="teaser-section" className="relative bg-night-deep px-6 sm:px-12 lg:px-20 py-28 sm:py-36">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                <Reveal>
                    <Overline>L'Avant-Première</Overline>
                    <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight">
                        Un aperçu<br />de la <em className="text-gold">nuit.</em>
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="max-w-xs text-sm font-light leading-relaxed text-white/50 md:text-right">
                        Le tapis est déroulé, les projecteurs allumés. Appuyez sur lecture — la nuit commence ici.
                    </p>
                </Reveal>
            </div>

            <Reveal delay={0.15}>
                <div className="relative max-w-5xl mx-auto">
                    <div className="absolute -inset-3 border border-gold/25 translate-x-3 translate-y-3 pointer-events-none" />
                    <div
                        className="relative group cursor-pointer"
                        onClick={toggle}
                        data-testid="teaser-frame"
                    >
                        <video
                            ref={videoRef}
                            data-testid="teaser-video"
                            src="/videos/teaser.mp4"
                            poster={TEASER_POSTER}
                            preload="metadata"
                            playsInline
                            loop
                            className="w-full aspect-video object-cover [clip-path:polygon(2%_0,100%_3%,98%_100%,0_97%)]"
                        />
                        <div
                            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 [clip-path:polygon(2%_0,100%_3%,98%_100%,0_97%)] ${
                                playing ? "opacity-0" : "opacity-100"
                            } bg-[radial-gradient(ellipse_at_50%_30%,rgba(212,175,55,0.18),rgba(10,14,23,0.72)_75%)]`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {!playing ? (
                                    <motion.button
                                        key="play"
                                        data-testid="teaser-play-button"
                                        aria-label="Lire la vidéo"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.3 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border border-gold/70 bg-night/40 backdrop-blur-md text-gold transition-colors duration-500 hover:bg-gold hover:text-night-deep"
                                    >
                                        <Play size={26} strokeWidth={1.25} className="translate-x-0.5" />
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        key="pause"
                                        data-testid="teaser-pause-button"
                                        aria-label="Mettre en pause"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-night/50 backdrop-blur-md text-white"
                                    >
                                        <Pause size={20} strokeWidth={1.25} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-white/40">
                        <span>L'avant-première · MMXXVI</span>
                        <span>Son recommandé</span>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
