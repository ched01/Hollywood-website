import { MANIFESTO_CHAPTERS } from "@/data/content";
import { Reveal, Overline } from "./Reveal";

export default function Manifesto() {
    return (
        <section data-testid="manifesto-section" className="relative bg-night-deep px-6 sm:px-12 lg:px-20 py-28 sm:py-36">
            <Reveal>
                <Overline>The Manifesto</Overline>
            </Reveal>
            <div className="mt-16 space-y-24 sm:space-y-32">
                {MANIFESTO_CHAPTERS.map((chapter, i) => (
                    <Reveal key={chapter.number} delay={0.05}>
                        <div
                            data-testid={`manifesto-chapter-${chapter.number}`}
                            className={`relative flex flex-col md:flex-row md:items-start gap-6 md:gap-0 ${
                                i % 2 === 1 ? "md:flex-row-reverse" : ""
                            }`}
                        >
                            <span
                                aria-hidden="true"
                                className="font-display font-semibold text-outline-gold text-[7rem] sm:text-[11rem] leading-[0.8] md:-mt-8 md:w-[38%] shrink-0 select-none"
                            >
                                {chapter.number}
                            </span>
                            <div className={`md:w-[62%] ${i % 2 === 1 ? "md:pr-16" : "md:pl-16 md:-ml-24"} md:pt-10 relative`}>
                                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
                                    {chapter.title}
                                </h2>
                                <div className="mt-4 h-px w-16 bg-gold/60" />
                                <p className="mt-6 max-w-xl text-base sm:text-lg font-light leading-relaxed text-white/65">
                                    {chapter.body}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
