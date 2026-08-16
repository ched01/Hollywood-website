import { MARQUEE_ITEMS } from "@/data/content";

export default function Marquee() {
    const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
    return (
        <div data-testid="editorial-marquee" className="relative overflow-hidden py-16 sm:py-24 bg-night border-b border-gold/10">
            <div className="animate-marquee flex whitespace-nowrap will-change-transform">
                {[0, 1].map((half) => (
                    <div key={half} className="flex shrink-0 items-center">
                        {row.map((item, i) => (
                            <span key={`${half}-${i}`} className="flex items-center">
                                <span
                                    className={`font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight px-10 sm:px-16 ${
                                        i % 2 === 0 ? "text-outline-gold italic" : "text-white/90"
                                    }`}
                                >
                                    {item}
                                </span>
                                <span className="text-gold text-2xl sm:text-3xl">✦</span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
