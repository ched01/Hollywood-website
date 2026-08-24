import { NAV_LINKS } from "@/data/content";

export default function Footer({ onNavigate }) {
    return (
        <footer data-testid="site-footer" className="relative bg-night border-t border-gold/15 px-6 sm:px-12 lg:px-20 pt-20 pb-10 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
                <div>
                    <p className="font-display italic text-2xl tracking-wide text-gold">
                        Hollywood <span className="not-italic text-white/60 text-sm align-super">'26</span>
                    </p>
                    <p className="mt-4 max-w-xs text-xs font-light leading-relaxed text-white/40">
                        Once Upon a Time in Hollywood — une soirée en or, en l'honneur de Lavinia.
                        3 octobre 2026 · Le Piesmont, Lasne.
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
                className="mt-16 font-display italic font-semibold text-outline-faint text-[10.5vw] leading-[0.9] whitespace-nowrap select-none pointer-events-none text-center"
            >
                Once upon a time
            </p>
            <div className="mt-8 flex flex-col gap-2 text-[10px] tracking-[0.25em] uppercase text-white/30">
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <span>© MMXXVI · Une affaire privée</span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-white/30" data-testid="footer-credit">
                        Site réalisé par{" "}
                        <a href="https://www.cedemeeus.be" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors duration-300">
                            Charles-Edouard de Meeûs · www.cedemeeus.be
                        </a>
                        {" · "}
                        <a href="mailto:hello@cedemeeus.be" className="hover:text-gold transition-colors duration-300">
                            hello@cedemeeus.be
                        </a>
                    </span>
                </div>
                <span className="normal-case tracking-normal text-white/25">
                    Musique : « Bossa Antigua » — Kevin MacLeod (incompetech.com), licence CC BY 4.0
                </span>
            </div>
        </footer>
    );
}
