import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/data/content";

export default function Nav({ onNavigate }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            data-testid="main-nav"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
                scrolled ? "bg-night/60 backdrop-blur-2xl border-b border-gold/20" : "bg-transparent border-b border-transparent"
            }`}
        >
            <div className="flex items-center justify-between px-6 sm:px-12 lg:px-20 py-5">
                <button
                    data-testid="nav-logo"
                    onClick={() => onNavigate("#the-night")}
                    className="font-display text-xl sm:text-2xl tracking-[0.18em] text-gold gold-glow"
                >
                    OSCARS <span className="text-white/60 text-sm align-super tracking-normal">'26</span>
                </button>
                <nav className="hidden md:flex items-center gap-10">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.href}
                            data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={() => onNavigate(link.href)}
                            className="link-underline text-[11px] tracking-[0.3em] uppercase text-white/70 hover:text-gold transition-colors duration-300"
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>
                <button
                    data-testid="nav-rsvp-button"
                    onClick={() => onNavigate("#rsvp")}
                    className="md:hidden text-[11px] tracking-[0.3em] uppercase text-gold border border-gold/50 px-4 py-2"
                >
                    RSVP
                </button>
            </div>
        </header>
    );
}
