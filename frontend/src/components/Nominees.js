import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/data/content";
import { Reveal, Overline } from "./Reveal";

export default function Nominees() {
    const [active, setActive] = useState(CATEGORIES[0].id);
    const category = CATEGORIES.find((c) => c.id === active);

    return (
        <section id="contenders" data-testid="nominees-section" className="relative bg-night px-6 sm:px-12 lg:px-20 py-28 sm:py-36">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <Reveal>
                    <Overline>The Contenders</Overline>
                    <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight">
                        Names the season<br />
                        <em className="text-gold">will remember.</em>
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="max-w-sm text-sm font-light leading-relaxed text-white/50">
                        A curated shortlist of the performances and pictures defining the race —
                        the Academy reveals its official nominations in January.
                    </p>
                </Reveal>
            </div>

            <Reveal delay={0.15} className="mt-14">
                <div className="flex flex-wrap gap-3" role="tablist" aria-label="Award categories">
                    {CATEGORIES.map((c) => (
                        <button
                            key={c.id}
                            role="tab"
                            aria-selected={active === c.id}
                            data-testid={`category-tab-${c.id}`}
                            onClick={() => setActive(c.id)}
                            className={`px-5 py-2.5 text-[11px] tracking-[0.25em] uppercase border transition-all duration-500 ${
                                active === c.id
                                    ? "border-gold bg-gold text-night-deep"
                                    : "border-white/15 text-white/60 hover:border-gold/60 hover:text-gold"
                            }`}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>
            </Reveal>

            <div className="mt-12 min-h-[380px]">
                <AnimatePresence mode="wait">
                    <motion.ul
                        key={category.id}
                        data-testid="nominee-list"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="divide-y divide-white/10 border-t border-b border-white/10"
                    >
                        {category.nominees.map((n, i) => (
                            <motion.li
                                key={n.name}
                                initial={{ opacity: 0, x: -24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                className="group flex items-baseline gap-6 sm:gap-10 py-6 sm:py-7 cursor-default"
                                data-testid={`nominee-${category.id}-${i}`}
                            >
                                <span className="font-display text-gold/50 text-lg sm:text-xl w-8 shrink-0 tabular-nums">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between w-full gap-1 sm:gap-8">
                                    <span className="font-display text-2xl sm:text-4xl tracking-tight text-white/85 transition-all duration-500 group-hover:text-gold group-hover:translate-x-2">
                                        {n.name}
                                    </span>
                                    <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-white/40 group-hover:text-white/60 transition-colors duration-500">
                                        {n.detail}
                                    </span>
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>
                </AnimatePresence>
            </div>
        </section>
    );
}
