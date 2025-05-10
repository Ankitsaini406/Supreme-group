"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Features() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "center center"]
    });

    // Translate from 30vh to 0vh based on scroll progress
    const y = useTransform(scrollYProgress, [0, 1], ["30vh", "0vh"]);

    return (
        <div ref={targetRef} className="h-[200vh] relative">
            <motion.div
                style={{ y }}
                className="sticky top-20 flex items-center justify-center"
            >
                <h2 className="text-2xl md:text-4xl text-foreground font-light text-center z-10 leading-snug">
                    Evolving the drive with <strong>360-degree</strong><br />
                    comprehensive solutions
                </h2>
            </motion.div>
        </div>
    );
}
