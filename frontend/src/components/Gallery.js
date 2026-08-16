import { GALLERY_IMAGES } from "@/data/content";
import { Reveal, Overline } from "./Reveal";

export default function Gallery() {
    return (
        <section id="carpet" data-testid="gallery-section" className="relative bg-night-deep px-6 sm:px-12 lg:px-20 py-28 sm:py-36">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                <Reveal>
                    <Overline>The Carpet</Overline>
                    <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight">
                        Ninety feet<br />of <em className="text-gold">crimson.</em>
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="max-w-xs text-sm font-light leading-relaxed text-white/50 md:text-right">
                        Two thousand flashes. One slow walk. The most photographed ninety seconds in cinema.
                    </p>
                </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[260px] gap-6 md:gap-8">
                {GALLERY_IMAGES.map((img, i) => (
                    <Reveal key={img.url} delay={i * 0.06} className={`${img.span} group`}>
                        <figure
                            data-testid={`gallery-item-${i}`}
                            className={`relative overflow-hidden border border-gold/15 ${img.ratio} h-full`}
                        >
                            <img
                                src={img.url}
                                alt={img.caption}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-night-deep/85 via-transparent to-night-deep/20 opacity-80 transition-opacity duration-700 group-hover:opacity-50" />
                            <figcaption className="absolute bottom-0 left-0 p-5 flex items-baseline gap-3">
                                <span className="font-display text-gold text-lg italic">{String(i + 1).padStart(2, "0")}</span>
                                <span className="text-[11px] tracking-[0.3em] uppercase text-white/85">{img.caption}</span>
                            </figcaption>
                            <span className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                        </figure>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
