"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Data source for each vehicle type
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
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    const isStickyInView = useInView(stickyRef, { margin: "-80px 0px -80% 0px" });

    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [activeVehicleType, setActiveVehicleType] = useState<"passenger" | "commercial">("passenger");
    const [activeVideoId, setActiveVideoId] = useState(passengerVideos[0].id);

    const videos = activeVehicleType === "passenger" ? passengerVideos : commercialVideos;
    const currentVideo = videos.find(v => v.id === activeVideoId);
    const { scrollYProgress } = useScroll({
        target: headingRef,
        offset: ["start start", "start center"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0vh", "5vh"]);

    // Sync video playback when active video changes
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement || !currentVideo) return;

        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.load();
        videoElement.play().catch(() => { });
        setIsPlaying(true);

        const updateProgress = () => {
            setProgress(videoElement.currentTime / videoElement.duration || 0);
        };

        videoElement.addEventListener("timeupdate", updateProgress);
        return () => videoElement.removeEventListener("timeupdate", updateProgress);
    }, []);

    // Scroll-based video activation logic
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const scrollY = window.scrollY;
            const sectionTop = sectionRef.current.offsetTop;
            const relativeScroll = scrollY - sectionTop;
            const vh = window.innerHeight;
            const segmentHeight = vh * 0.5;

            const totalPassenger = passengerVideos.length * segmentHeight;
            const totalCommercial = commercialVideos.length * segmentHeight;

            let newType = activeVehicleType;
            let newVideoId = activeVideoId;

            if (relativeScroll < totalPassenger) {
                newType = "passenger";
                const index = Math.floor(relativeScroll / segmentHeight);
                newVideoId = passengerVideos[Math.max(0, Math.min(index, passengerVideos.length - 1))].id;
            } else if (relativeScroll < totalPassenger + totalCommercial) {
                newType = "commercial";
                const index = Math.floor((relativeScroll - totalPassenger) / segmentHeight);
                newVideoId = commercialVideos[Math.max(0, Math.min(index, commercialVideos.length - 1))].id;
            }

            if (newType !== activeVehicleType) setActiveVehicleType(newType);
            if (newVideoId !== activeVideoId) setActiveVideoId(newVideoId);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeVehicleType, activeVideoId]);

    const toggleVideoPlayback = () => {
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

    const scrollToVideo = (videoId: string) => {
        if (!sectionRef.current) return;

        const allVideos = [...passengerVideos, ...commercialVideos];
        const index = allVideos.findIndex(v => v.id === videoId);
        const segmentHeight = window.innerHeight * 0.5;
        const scrollTarget = sectionRef.current.offsetTop + index * segmentHeight;

        window.scrollTo({ top: scrollTarget });
    };

    // Progress ring values
    const radius = 20;
    const stroke = 2;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div
            ref={sectionRef}
            className="relative bg-black py-40"
            style={{ height: `${(passengerVideos.length + commercialVideos.length) * 50}vh` }}
        >
            <motion.div
                ref={stickyRef}
                className="sticky top-20 flex flex-col gap-20 items-center justify-center"
            >
                {/* Title */}
                    <motion.h2 ref={headingRef} style={{ y }}
                        className="z-10 leading-snug text-2xl md:text-4xl text-foreground font-light text-center"
                    >
                        Evolving the drive with <strong>360-degree</strong><br />
                        comprehensive solutions
                    </motion.h2>

                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={isStickyInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8 }}
                    className="lg:grid grid-cols-[30%_70%] w-full"
                >
                    {/* Navigation */}
                    <div className="relative hidden lg:flex flex-col gap-10 pl-14 ml-[15%] py-5 grow-0">
                        {[
                            { type: "passenger", label: "Passenger vehicles", subtext: "Revving up Nonwoven innovation from interior to exterior." },
                            { type: "commercial", label: "Commercial vehicles", subtext: "Advancing Nonwoven engineering for heavy-duty vehicles." }
                        ].map(({ type, label, subtext }) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => {
                                    setActiveVehicleType(type as any);
                                    const firstVideo = type === "passenger" ? passengerVideos[0].id : commercialVideos[0].id;
                                    setActiveVideoId(firstVideo);
                                    scrollToVideo(firstVideo);
                                }}
                                className={`transition-opacity duration-300 text-left cursor-pointer ${activeVehicleType === type ? "opacity-100" : "opacity-20"} ${type === 'commercial' ? "mt-12" : "mt-4"}`}
                            >
                                <h5 className="font-medium pb-2 2xl:text-2xl">{label}</h5>
                                <h6 className="font-light">{subtext}</h6>
                            </button>
                        ))}

                        {/* Active Bar */}
                        <div className="absolute left-0 h-full w-1 rounded-md bg-gray-50/20 top-0">
                            <div className={`h-[50%] w-1 bg-foreground rounded-md ${activeVehicleType === "commercial" ? "translate-y-full" : "translate-y-0"} transition-transform duration-500`} />
                        </div>
                    </div>

                    {/* Video Player */}
                    <div className="relative flex items-center justify-center w-full grow h-[40vh] overflow-hidden scale-y-105">
                        <motion.video
                            key={currentVideo?.video}
                            ref={videoRef}
                            initial={{ opacity: 0, scale: 0.8, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute w-auto max-h-96 min-h-56 2xl:h-[40vh] object-cover"
                            autoPlay
                            muted
                            playsInline
                        >
                            <source src={currentVideo?.video} type="video/mp4" />
                        </motion.video>
                    </div>
                </motion.div>

                {/* Thumbnail Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={isStickyInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:flex gap-4 justify-end items-center w-1/2"
                >
                    {videos.map((video) => (
                        <div key={video.id} className="flex flex-col items-center">
                            <button
                                onClick={() => {
                                    setActiveVideoId(video.id);
                                    scrollToVideo(video.id);
                                }}
                                className={`flex flex-col items-center ${activeVideoId === video.id ? "opacity-100" : "opacity-30"} hover:opacity-100 cursor-pointer`}
                            >
                                <div className="relative w-20 aspect-square">
                                    <Image src={video.src} alt={video.label} fill />
                                </div>
                                <span>{video.label}</span>
                            </button>
                        </div>
                    ))}

                    {/* Play/Pause Progress Ring */}
                    <div className="absolute -right-20 flex items-center">
                        <div className="relative inline-block z-40">
                            <svg
                                height={radius * 2}
                                width={radius * 2}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[270deg]"
                            >
                                <circle stroke="gray" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
                                <circle
                                    stroke="white"
                                    fill="transparent"
                                    strokeWidth={stroke}
                                    strokeDasharray={`${circumference} ${circumference}`}
                                    style={{ strokeDashoffset, transition: "stroke-dashoffset 0.2s" }}
                                    r={normalizedRadius}
                                    cx={radius}
                                    cy={radius}
                                />
                            </svg>
                            <button onClick={toggleVideoPlayback} className="relative p-3 2xl:p-4 rounded-full z-10 cursor-pointer">
                                {isPlaying ? <span className="text-sm">❚❚</span> : <span className="text-sm">▶</span>}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
