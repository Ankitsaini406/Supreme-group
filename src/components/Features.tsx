"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function Features() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "center center"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["30vh", "0vh"]);

    const [activeButton, setActiveButton] = useState<"passenger" | "commercial">("passenger");

    return (
        <div ref={targetRef} className="h-[200vh] relative">
            <motion.div
                style={{ y }}
                className="sticky top-20 flex flex-col gap-20 items-center justify-center"
            >
                <h2 className="text-2xl md:text-4xl text-foreground font-light text-center z-10 leading-snug">
                    Evolving the drive with <strong>360-degree</strong><br />
                    comprehensive solutions
                </h2>

                <div className="flex flex-col md:flex-row">
                    <div className="relative flex flex-col gap-10 pl-14 ml-[15%] 2xl:ml-[25%] 2xl:py-10 py-5">
                        <button
                            type="button"
                            onClick={() => setActiveButton("passenger")}
                            className={`transition-opacity duration-300 text-left cursor-pointer ${activeButton === "passenger" ? "opacity-100" : "opacity-20"
                                }`}
                        >
                            <h5 className="font-medium pb-2 2xl:text-2xl">Passenger vehicles</h5>
                            <h6 className="font-light">Revving up Nonwoven innovation from interior to exterior.</h6>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveButton("commercial")}
                            className={`transition-opacity duration-300 text-left cursor-pointer mt-14 ${activeButton === "commercial" ? "opacity-100" : "opacity-20"
                                }`}
                        >
                            <h5 className="font-medium pb-2 2xl:text-2xl">Commercial vehicles</h5>
                            <h6 className="font-light">Advancing Nonwoven engineering for heavy-duty vehicles.</h6>
                        </button>

                        <div className="absolute left-0 h-full w-1 rounded-md bg-gray-50/20 top-0">
                            <div className={`h-[50%] w-1 bg-foreground rounded-md ${activeButton === "commercial" ? 'translate-y-full' : 'translate-y-0'}`}></div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
