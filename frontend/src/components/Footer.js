import { NAV_LINKS } from "@/data/content";

export default function Footer({ onNavigate }) {
    return (
        <footer data-testid="site-footer" className="relative bg-night border-t border-gold/15 px-6 sm:px-12 lg:px-20 pt-20 pb-10 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
                <div>
                    <p className="font-display text-2xl tracking-[0.18em] text-gold">
                        OSCARS <span className="text-white/60 text-sm align-super tracking-normal">'26</span>
                    </p>
                    <p className="mt-4 max-w-xs text-xs font-light leading-relaxed text-white/40">
                        An unofficial concept experience celebrating the 98th Academy Awards.
                        March 15, 2026 · Dolby Theatre, Hollywood.
                    </p>
                </div>
                <nav className="flex flex-col gap-3">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.href}
                            data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={() => onNavigate(link.href)}
                            className="text-left text-[11px] tracking-[0.3em] uppercase text-white/50 hover:text-gold transition-colors duration-300 w-fit link-underline"
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>
            </div>
            <p
                aria-hidden="true"
                className="mt-16 font-display font-semibold text-outline-faint text-[16vw] leading-[0.8] whitespace-nowrap select-none pointer-events-none text-center"
            >
                OSCARS 2026
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3 text-[10px] tracking-[0.25em] uppercase text-white/30">
                <span>© MMXXVI · A concept tribute</span>
                <span>Crafted in night blue & gold</span>
            </div>
        </footer>
    );
}
