import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientMusic() {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const toggle = async () => {
        const a = audioRef.current;
        if (!a) return;
        if (playing) {
            a.pause();
            setPlaying(false);
        } else {
            a.volume = 0.35;
            try {
                await a.play();
                setPlaying(true);
            } catch {}
        }
    };

    return (
        <>
            <audio ref={audioRef} src="/audio/gala.mp3" loop preload="none" />
            <motion.button
                data-testid="ambient-music-toggle"
                aria-label={playing ? "Couper la musique" : "Écouter la bande-son"}
                onClick={toggle}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed bottom-7 left-6 sm:left-12 lg:left-20 z-40 group flex items-center gap-3"
            >
                <span className={`relative flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-500 ${
                    playing
                        ? "border-gold bg-gold text-night-deep"
                        : "border-gold/60 bg-night/40 text-gold group-hover:bg-gold group-hover:text-night-deep"
                }`}>
                    {playing && (
                        <span className="absolute inset-0 rounded-full border border-gold/60 animate-ping" style={{ animationDuration: "2.4s" }} />
                    )}
                    {playing ? <Volume2 size={16} strokeWidth={1.5} /> : <VolumeX size={16} strokeWidth={1.5} />}
                </span>
                <span className={`text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 ${
                    playing ? "text-gold" : "text-white/50 group-hover:text-gold"
                }`}>
                    {playing ? "Bande-son · en cours" : "Bande-son du gala"}
                </span>
            </motion.button>
        </>
    );
}
