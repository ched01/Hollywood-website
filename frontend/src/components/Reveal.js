import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className, y = 40 }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
        {children}
    </motion.div>
);

export const Overline = ({ children, className = "" }) => (
    <p className={`text-xs tracking-[0.35em] uppercase text-gold font-body ${className}`}>
        {children}
    </p>
);
