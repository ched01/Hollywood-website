import { DRESS_LOOKS, DRESSCODE_IMAGE } from "@/data/content";
import { Reveal, Overline } from "./Reveal";

export default function Dresscode() {
    return (
        <section id="dresscode" data-testid="dresscode-section" className="relative bg-night-deep px-6 sm:px-12 lg:px-20 py-28 sm:py-36 overflow-hidden">
            <span
                aria-hidden="true"
                className="absolute top-10 right-0 font-display italic text-outline-faint text-[13vw] leading-none select-none pointer-events-none"
            >
                Lavinia
            </span>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
                <Reveal>
                    <figure className="relative order-last lg:order-first" data-testid="dresscode-image">
                        <div className="absolute -inset-3 border border-gold/25 -translate-x-4 translate-y-4 pointer-events-none" />
                        <img
                            src={DRESSCODE_IMAGE.url}
                            alt="Allure de gala sur le tapis rouge"
                            loading="lazy"
                            className="relative w-full aspect-[4/5] object-cover [clip-path:polygon(0_0,100%_4%,100%_100%,0_96%)]"
                        />
                        <figcaption className="mt-5 text-[11px] tracking-[0.3em] uppercase text-white/45">
                            {DRESSCODE_IMAGE.caption}
                        </figcaption>
                    </figure>
                </Reveal>
                <div>
                    <Reveal>
                        <Overline>Dress Code</Overline>
                        <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02]">
                            À la hauteur<br />du <em className="text-gold">tapis rouge.</em>
                        </h2>
                        <p className="mt-8 max-w-md text-base font-light leading-relaxed text-white/60">
                            Robe longue pour elle, black tie pour lui. Les flashs ne s'éteignent
                            jamais — arrivez comme si chaque objectif vous attendait.
                        </p>
                    </Reveal>
                    <div className="mt-12 space-y-10">
                        {DRESS_LOOKS.map((look, i) => (
                            <Reveal key={look.number} delay={0.08 * i}>
                                <div data-testid={`dress-look-${i}`} className="group flex items-start gap-6 sm:gap-8">
                                    <span className="font-display italic text-outline-gold text-4xl sm:text-5xl leading-none shrink-0 w-14 transition-all duration-500 group-hover:gold-glow">
                                        {look.number}
                                    </span>
                                    <div className="border-l border-white/10 pl-6 sm:pl-8 group-hover:border-gold/50 transition-colors duration-500">
                                        <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-white/90 group-hover:text-gold transition-colors duration-500">
                                            {look.title}
                                        </h3>
                                        <p className="mt-3 text-sm sm:text-base font-light leading-relaxed text-white/55">
                                            {look.body}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
