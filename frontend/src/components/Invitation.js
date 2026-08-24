import { EVENING_STEPS, EVENT_FACTS } from "@/data/content";
import { Reveal, Overline } from "./Reveal";
import { MapPin } from "lucide-react";

export default function Invitation() {
    return (
        <section id="invitation" data-testid="invitation-section" className="relative bg-night px-6 sm:px-12 lg:px-20 py-28 sm:py-36">
            {/* Formal invitation card */}
            <Reveal>
                <div data-testid="invitation-card" className="relative max-w-3xl mx-auto text-center px-6 sm:px-16 py-16 sm:py-20">
                    <div className="absolute inset-0 border border-gold/30 pointer-events-none" />
                    <div className="absolute inset-2 border border-gold/15 pointer-events-none" />
                    <p className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-white/60">
                        Monsieur et Madame Anton Cox
                    </p>
                    <p className="mt-5 text-[11px] sm:text-xs tracking-[0.4em] uppercase text-white/60">
                        vous prient d'assister à la soirée
                    </p>
                    <p className="mt-8 font-display italic text-gold gold-glow text-3xl sm:text-5xl leading-tight">
                        Once Upon a Time<br />in Hollywood
                    </p>
                    <p className="mt-8 text-[11px] sm:text-xs tracking-[0.4em] uppercase text-white/60">
                        qu'ils donnent pour
                    </p>
                    <p className="mt-5 font-display text-4xl sm:text-6xl tracking-tight text-white">
                        leur fille <em className="text-gold">Lavinia</em>
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-5">
                        <span className="h-px w-14 bg-gold/50" />
                        <span className="text-gold text-sm">✦</span>
                        <span className="h-px w-14 bg-gold/50" />
                    </div>
                    <p className="mt-10 text-sm sm:text-base tracking-[0.35em] uppercase text-gold">
                        Le 03 octobre 2026 à 20h
                    </p>
                </div>
            </Reveal>

            {/* Evening programme */}
            <div className="mt-28 sm:mt-36">
                <Reveal>
                    <Overline>Le Déroulement de la Soirée</Overline>
                </Reveal>
                <div className="mt-16 space-y-24 sm:space-y-32">
                    {EVENING_STEPS.map((step, i) => (
                        <Reveal key={step.number} delay={0.05}>
                            <div
                                data-testid={`evening-step-${step.number}`}
                                className={`relative flex flex-col md:flex-row md:items-start gap-6 md:gap-0 ${
                                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                            >
                                <span
                                    aria-hidden="true"
                                    className="font-display font-semibold text-outline-gold text-[7rem] sm:text-[11rem] leading-[0.8] md:-mt-8 md:w-[38%] shrink-0 select-none"
                                >
                                    {step.number}
                                </span>
                                <div className={`md:w-[62%] ${i % 2 === 1 ? "md:pr-16" : "md:pl-16 md:-ml-24"} md:pt-10 relative`}>
                                    <p className="text-xs tracking-[0.4em] uppercase text-gold">{step.time}</p>
                                    <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
                                        {step.title}
                                    </h2>
                                    <div className="mt-4 h-px w-16 bg-gold/60" />
                                    <p className="mt-6 max-w-xl text-base sm:text-lg font-light leading-relaxed text-white/65">
                                        {step.body}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Practical information */}
            <Reveal className="mt-28 sm:mt-36">
                <div className="max-w-3xl" data-testid="practical-info">
                    <Overline>Informations Pratiques</Overline>
                    <div className="mt-8 divide-y divide-white/10 border-t border-b border-white/10">
                        {EVENT_FACTS.map((fact, i) => (
                            <div key={fact.label} data-testid={`event-fact-${i}`} className="grid grid-cols-[110px_1fr] gap-6 py-4 items-baseline">
                                <span className="text-[10px] tracking-[0.3em] uppercase text-gold/80">{fact.label}</span>
                                <span className="text-base sm:text-lg font-light text-white/80">{fact.value}</span>
                            </div>
                        ))}
                    </div>
                    <a
                        data-testid="invitation-map-link"
                        href="https://maps.google.com/?q=Le+Piesmont,+All%C3%A9e+des+Grands+Clos+8,+1380+Lasne"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-gold link-underline"
                    >
                        <MapPin size={14} strokeWidth={1.5} /> Ouvrir dans Google Maps
                    </a>
                </div>
            </Reveal>
        </section>
    );
}
