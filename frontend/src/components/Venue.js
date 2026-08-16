import { VENUE_FACTS } from "@/data/content";
import { Reveal, Overline } from "./Reveal";
import { MapPin } from "lucide-react";

const VENUE_IMAGE =
    "https://images.unsplash.com/photo-1738081613098-caea4cb0a035?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHw0fHxob2xseXdvb2QlMjB0aGVhdHJlJTIwbmlnaHR8ZW58MHx8fHwxNzg2ODc0NjUyfDA&ixlib=rb-4.1.0&q=85";

export default function Venue() {
    return (
        <section id="venue" data-testid="venue-section" className="relative bg-night px-6 sm:px-12 lg:px-20 py-28 sm:py-36 overflow-hidden">
            <span
                aria-hidden="true"
                className="absolute -top-6 right-0 font-display font-semibold text-outline-faint text-[18vw] leading-none select-none pointer-events-none"
            >
                '26
            </span>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
                <Reveal>
                    <Overline>The Venue</Overline>
                    <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02]">
                        The Dolby<br />Theatre holds<br />its <em className="text-gold">breath.</em>
                    </h2>
                    <div className="mt-12 divide-y divide-white/10 border-t border-b border-white/10">
                        {VENUE_FACTS.map((fact, i) => (
                            <div key={fact.label} data-testid={`venue-fact-${i}`} className="grid grid-cols-[110px_1fr] gap-6 py-4 items-baseline">
                                <span className="text-[10px] tracking-[0.3em] uppercase text-gold/80">{fact.label}</span>
                                <span className="text-base sm:text-lg font-light text-white/80">{fact.value}</span>
                            </div>
                        ))}
                    </div>
                    <a
                        data-testid="venue-map-link"
                        href="https://maps.google.com/?q=Dolby+Theatre+Hollywood"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-10 inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-gold link-underline"
                    >
                        <MapPin size={14} strokeWidth={1.5} /> Find it on the map
                    </a>
                </Reveal>
                <Reveal delay={0.12}>
                    <figure className="relative" data-testid="venue-image">
                        <div className="absolute -inset-3 border border-gold/25 translate-x-4 translate-y-4 pointer-events-none" />
                        <img
                            src={VENUE_IMAGE}
                            alt="Hollywood theatre lit up at night"
                            loading="lazy"
                            className="relative w-full aspect-[4/5] object-cover [clip-path:polygon(0_4%,100%_0,100%_96%,0_100%)]"
                        />
                        <figcaption className="mt-5 text-[11px] tracking-[0.3em] uppercase text-white/45">
                            Hollywood Boulevard · Ceremony night
                        </figcaption>
                    </figure>
                </Reveal>
            </div>
        </section>
    );
}
