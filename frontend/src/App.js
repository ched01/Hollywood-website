import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Trailer from "@/components/Trailer";
import Marquee from "@/components/Marquee";
import Invitation from "@/components/Invitation";
import Dresscode from "@/components/Dresscode";
import Gallery from "@/components/Gallery";
import Rsvp from "@/components/Rsvp";
import Footer from "@/components/Footer";
import AmbientMusic from "@/components/AmbientMusic";
import Hosts from "@/components/Hosts";
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
                <Trailer />
                <Marquee />
                <Invitation />
                <Dresscode />
                <Gallery />
                <Rsvp />
            </main>
            <Footer onNavigate={navigate} />
            <AmbientMusic />
        </div>
    );
}

function MainSite() {
    return (
        <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
            <Page />
        </ReactLenis>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainSite />} />
                <Route path="/hotes" element={<Hosts />} />
            </Routes>
            <Toaster theme="dark" position="bottom-right" />
        </BrowserRouter>
    );
}

export default App;
