"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const passengerVideos = [
    { id: "passenger-complete-body", label: "Complete body", video: "/pessenger.mp4" },
    { id: "passenger-front", label: "Front", video: "/front.mp4" },
    { id: "passenger-cabin", label: "Cabin", video: "/cabin.mp4" },
    { id: "passenger-trunk", label: "Trunk", video: "/trunk.mp4" },
    { id: "passenger-exterior", label: "Exterior", video: "/exterior.mp4" },
];

const commercialVideos = [
    { id: "commercial-complete-body", label: "Complete body", video: "/commercial.mp4" },
    { id: "commercial-front", label: "Front", video: "/commercial-front.mp4" },
    { id: "commercial-cabin", label: "Cabin", video: "/commercial-cabin.mp4" },
];

const VideoSection = ({ title, subtitle, videos }: { title: string; subtitle: string; videos: { id: string; label: string; video: string }[] }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [activeVideoId, setActiveVideoId] = useState(videos[0].id);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const currentVideo = videos.find(v => v.id === activeVideoId);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !currentVideo) return;

        video.pause();
        video.currentTime = 0;
        video.load();
        video.play().catch(() => { });
        setIsPlaying(true);

        const handleTimeUpdate = () => {
            setProgress(video.currentTime / video.duration || 0);
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }, [currentVideo]);

    const togglePlay = () => {
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mx-auto px-4 py-10"
        >
            <h2 className="text-xl md:text-3xl text-center font-semibold mb-2 text-accent">{title}</h2>
            <h6 className="font-light text-center mb-6">{subtitle}</h6>

            <div className="relative flex justify-center items-center">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                >
                    <source src={currentVideo?.video} type="video/mp4" />
                </video>

                {/* <button
                    onClick={togglePlay}
                    className="absolute bottom-4 left-4 text-white text-xl bg-black bg-opacity-60 p-2 rounded-full"
                >
                    {isPlaying ? "❚❚" : "▶"}
                </button> */}
            </div>

            {/* Dot Buttons */}
            <div className="flex justify-center gap-3 mt-6">
                {videos.map((v) => (
                    <button
                        key={v.id}
                        onClick={() => setActiveVideoId(v.id)}
                        className={`w-3 h-3 rounded-full ${activeVideoId === v.id ? "bg-white" : "bg-gray-600"
                            }`}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default function Features() {
    return (
        <div className="bg-black py-20">
            <h2 className="z-10 leading-snug text-2xl md:text-4xl text-foreground font-light text-center">
                Evolving the drive with <strong>360-degree</strong><br />
                comprehensive solutions
            </h2>
            <VideoSection title="Passenger Vehicles" subtitle="Revving up Nonwoven innovation from interior to exterior." videos={passengerVideos} />
            <VideoSection title="Commercial Vehicles" subtitle="Advancing Nonwoven engineering for heavy-duty vehicles." videos={commercialVideos} />
        </div>
    );
}
