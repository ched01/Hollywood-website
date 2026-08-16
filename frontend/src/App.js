import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import "@/App.css";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Nominees from "@/components/Nominees";
import Gallery from "@/components/Gallery";
import Venue from "@/components/Venue";
import Rsvp from "@/components/Rsvp";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

function Page() {
    const lenis = useLenis();
    const navigate = (hash) => {
        const el = document.querySelector(hash);
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.6 });
        else el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="relative bg-night-deep text-white font-body">
            <div className="grain-overlay" aria-hidden="true" />
            <Nav onNavigate={navigate} />
            <main>
                <Hero onNavigate={navigate} />
                <Countdown />
                <Marquee />
                <Manifesto />
                <Nominees />
                <Gallery />
                <Venue />
                <Rsvp />
            </main>
            <Footer onNavigate={navigate} />
            <Toaster theme="dark" position="bottom-right" />
        </div>
    );
}

function App() {
    return (
        <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
            <Page />
        </ReactLenis>
    );
}

export default App;
