import { useEffect, useState } from "react";
import { EVENT_DATE, EVENT_DATE_LABEL } from "@/data/content";
import { Reveal } from "./Reveal";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

function getParts() {
    const diff = EVENT_DATE.getTime() - Date.now();
    if (diff <= 0) return null;
    return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff / 3600000) % 24,
        minutes: Math.floor(diff / 60000) % 60,
        seconds: Math.floor(diff / 1000) % 60,
    };
}

export default function Countdown() {
    const [parts, setParts] = useState(getParts());

    useEffect(() => {
        const t = setInterval(() => setParts(getParts()), 1000);
        return () => clearInterval(t);
    }, []);

    return (
        <section data-testid="countdown-section" className="relative border-y border-gold/15 bg-night-deep py-14 px-6 sm:px-12 lg:px-20">
            <Reveal className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20">
                <div className="shrink-0">
                    <p className="text-xs tracking-[0.35em] uppercase text-gold">
                        {parts ? "Avant la montée des marches" : "Le rideau s'est levé"}
                    </p>
                    <p className="mt-3 font-display text-2xl text-white/70 italic">
                        {parts ? EVENT_DATE_LABEL : "3 octobre 2026 — une nuit en or"}
                    </p>
                </div>
                {parts ? (
                    <div className="flex items-start gap-6 sm:gap-12" data-testid="countdown-timer">
                        {[
                            [parts.days, "Jours"],
                            [parts.hours, "Heures"],
                            [parts.minutes, "Minutes"],
                            [parts.seconds, "Secondes"],
                        ].map(([value, label], i) => (
                            <div key={label} className="flex items-center gap-6 sm:gap-12">
                                {i > 0 && <span className="text-gold/40 font-display text-4xl sm:text-6xl -mt-2">·</span>}
                                <div className="text-center">
                                    <span className="font-display text-5xl sm:text-7xl lg:text-8xl text-gold gold-glow tabular-nums leading-none">
                                        {pad(value)}
                                    </span>
                                    <span className="block mt-3 text-[10px] tracking-[0.35em] uppercase text-white/50">{label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="font-display text-3xl sm:text-5xl text-gold gold-glow italic" data-testid="countdown-past">
                        Quelle nuit ce fut.
                    </p>
                )}
            </Reveal>
        </section>
    );
}
