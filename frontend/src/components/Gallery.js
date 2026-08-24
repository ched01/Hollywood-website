import { Camera } from "lucide-react";
import { Reveal, Overline } from "./Reveal";

export default function Gallery() {
    return (
        <section id="photos" data-testid="photos-section" className="relative bg-night px-6 sm:px-12 lg:px-20 py-32 sm:py-44 overflow-hidden">
            <span
                aria-hidden="true"
                className="absolute top-1/2 -translate-y-1/2 right-0 font-display italic font-semibold text-outline-faint text-[15vw] leading-none select-none pointer-events-none whitespace-nowrap"
            >
                03.10
            </span>
            <div className="relative max-w-3xl">
                <Reveal>
                    <Overline>Photos</Overline>
                    <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight">
                        Les photos<br />de la <em className="text-gold">soirée.</em>
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <div className="mt-12 flex items-start gap-6">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                            <Camera size={20} strokeWidth={1.25} />
                        </span>
                        <p data-testid="photos-note" className="text-lg sm:text-xl font-light leading-relaxed text-white/65 pt-2">
                            Les photographies seront disponibles après la soirée, ici.
                        </p>
                    </div>
                </Reveal>
                <Reveal delay={0.18}>
                    <div className="mt-16 flex items-center gap-5">
                        <span className="h-px flex-1 bg-gold/20" />
                        <span className="text-gold/60 text-xs tracking-[0.35em] uppercase">À suivre</span>
                        <span className="h-px flex-1 bg-gold/20" />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
