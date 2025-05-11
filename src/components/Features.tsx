"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const passengerVideos = [
    { id: "passenger-complete-body", label: "Complete body", src: "/car/personal-complete-body.png", video: "/pessenger.mp4" },
    { id: "passenger-front", label: "Front", src: "/car/personal-front.png", video: "/front.mp4" },
    { id: "passenger-cabin", label: "Cabin", src: "/car/personal-cabine.png", video: "/cabin.mp4" },
    { id: "passenger-trunk", label: "Trunk", src: "/car/personal-trunk.png", video: "/trunk.mp4" },
    { id: "passenger-exterior", label: "Exterior", src: "/car/personal-exterior.png", video: "/exterior.mp4" },
];

const commercialVideos = [
    { id: "commercial-complete-body", label: "Complete body", src: "/car/commercial-complete-body.svg", video: "/commercial.mp4" },
    { id: "commercial-front", label: "Front", src: "/car/commercial-engine.svg", video: "/commercial-front.mp4" },
    { id: "commercial-cabin", label: "Cabin", src: "/car/commercial-cabin.svg", video: "/commercial-cabin.mp4" },
];

export default function Features() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "center center"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["30vh", "0vh"]);
    const [activeButton, setActiveButton] = useState<"passenger" | "commercial">("passenger");
    const [activeVideo, setActiveVideo] = useState<string>(passengerVideos[0].id);

    const currentVideos = activeButton === "passenger" ? passengerVideos : commercialVideos;

    const handleTopButtonClick = (category: "passenger" | "commercial") => {
        setActiveButton(category);
        const firstVideoId = (category === "passenger" ? passengerVideos[0].id : commercialVideos[0].id);
        setActiveVideo(firstVideoId);
    };

    const activeVideoSrc = currentVideos.find(v => v.id === activeVideo)?.video || "";

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.pause();
        video.currentTime = 0;
        video.load();
        video.play().catch(() => { });
        setIsPlaying(true);

        const updateProgress = () => {
            setProgress(video.currentTime / video.duration || 0);
        };

        video.addEventListener("timeupdate", updateProgress);

        return () => {
            video.removeEventListener("timeupdate", updateProgress);
        };
    }, [activeVideoSrc]);

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const radius = 20;
    const stroke = 2;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div ref={targetRef} className="h-[200vh] relative bg-black pb-40">
            <motion.div
                style={{ y }}
                className="sticky top-20 flex flex-col gap-20 items-center justify-center"
            >
                <h2 className="text-2xl md:text-4xl text-foreground font-light text-center z-10 leading-snug">
                    Evolving the drive with <strong>360-degree</strong><br />
                    comprehensive solutions
                </h2>

                <div className="md:grid grid-cols-[30%_70%] w-full">
                    <div className="relative flex flex-col gap-10 pl-14 ml-[15%] 2xl:py-10 py-5 grow-0">
                        <button
                            type="button"
                            onClick={() => handleTopButtonClick("passenger")}
                            className={`transition-opacity duration-300 text-left cursor-pointer ${activeButton === "passenger" ? "opacity-100" : "opacity-20"}`}
                        >
                            <h5 className="font-medium pb-2 2xl:text-2xl">Passenger vehicles</h5>
                            <h6 className="font-light">Revving up Nonwoven innovation from interior to exterior.</h6>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleTopButtonClick("commercial")}
                            className={`transition-opacity duration-300 text-left cursor-pointer mt-14 ${activeButton === "commercial" ? "opacity-100" : "opacity-20"}`}
                        >
                            <h5 className="font-medium pb-2 2xl:text-2xl">Commercial vehicles</h5>
                            <h6 className="font-light">Advancing Nonwoven engineering for heavy-duty vehicles.</h6>
                        </button>

                        <div className="absolute left-0 h-full w-1 rounded-md bg-gray-50/20 top-0">
                            <div className={`h-[50%] w-1 bg-foreground rounded-md ${activeButton === "commercial" ? 'translate-y-full' : 'translate-y-0'} transition-transform duration-500`}></div>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center w-full grow h-[40vh] overflow-hidden scale-y-105">
                        <motion.video
                            key={activeVideoSrc}
                            ref={videoRef}
                            initial={{ opacity: 0, scale: 0.8, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 100 }}
                            transition={{ duration: 0.6 }}
                            className="absolute w-auto max-h-96 min-h-56 2xl:h-[40vh] object-cover"
                            autoPlay
                            muted
                            playsInline
                        >
                            <source src={activeVideoSrc} type="video/mp4" />
                        </motion.video>
                    </div>
                </div>

                <div className="relative flex gap-4 justify-end items-center w-1/2">
                    {currentVideos.map(video => (
                        <div key={video.id} className="justify-center flex flex-col">
                            <button
                                onClick={() => setActiveVideo(video.id)}
                                className={`flex flex-col items-center ${activeVideo === video.id ? "opacity-100" : "opacity-30"} hover:opacity-100 cursor-pointer`}
                            >
                                <div className="relative w-20 aspect-square">
                                    <Image src={video.src} alt={video.label} fill />
                                </div>
                                <span>{video.label}</span>
                            </button>
                        </div>
                    ))}

                    <div className="absolute -right-20 my-auto z-40 flex items-center">
                        <div className="relative inline-block z-40">
                            <svg
                                height={radius * 2}
                                width={radius * 2}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[270deg]"
                            >
                                <circle
                                    stroke="gray"
                                    fill="transparent"
                                    strokeWidth={stroke}
                                    r={normalizedRadius}
                                    cx={radius}
                                    cy={radius}
                                />
                                <circle
                                    stroke="white"
                                    fill="transparent"
                                    strokeWidth={stroke}
                                    strokeDasharray={circumference + ' ' + circumference}
                                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.2s' }}
                                    r={normalizedRadius}
                                    cx={radius}
                                    cy={radius}
                                />
                            </svg>
                            <button
                                onClick={togglePlayPause}
                                className="relative p-3 2xl:p-4 rounded-full z-10 cursor-pointer"
                            >
                                {isPlaying ? (
                                    <span className="text-sm">❚❚</span>
                                ) : (
                                    <span className="text-sm">▶</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
