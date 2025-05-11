"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FeaturesMobile = dynamic(() => import("./FeaturesMobile"), { ssr: false });
const FeaturesDesktop = dynamic(() => import("./FeaturesDescktop"), { ssr: false });

export default function Features() {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile ? <FeaturesMobile /> : <FeaturesDesktop />;
}
