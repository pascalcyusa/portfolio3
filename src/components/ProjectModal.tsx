"use client";

import { Project } from "@/data/projects";
import { ResearchItem } from "@/data/research";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Github, FileText, Maximize2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface ProjectModalProps {
    project: Project | ResearchItem;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
}

const getYoutubeEmbedUrl = (url: string) => {
    try {
        const urlObj = new URL(url);
        let videoId = "";

        if (urlObj.hostname.includes("youtube.com")) {
            if (urlObj.pathname.includes("/shorts/")) {
                videoId = urlObj.pathname.split("/shorts/")[1];
            } else {
                videoId = urlObj.searchParams.get("v") || "";
            }
        } else if (urlObj.hostname.includes("youtu.be")) {
            videoId = urlObj.pathname.slice(1);
        }

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return null;
    } catch {
        return null;
    }
};

export default function ProjectModal({ project, onClose, onNext, onPrev }: ProjectModalProps) {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Combine images and videos for the carousel
    const images = project.images || [{ url: project.image, caption: project.title }];
    const videos = project.videos || [];

    // Create a unified media list: Videos first (optional preference) or mixed? 
    // Let's put images first then videos to match typical galleries, or videos first if they are feature.
    // The user said "half ... showing images ... and videos". 
    // Let's treat them as a single slide deck.
    const mediaItems = [
        ...images.map(img => ({ type: 'image' as const, ...img })),
        ...videos.map(vid => ({ type: 'video' as const, ...vid }))
    ];

    // Reset media index when project changes
    useEffect(() => {
        setCurrentMediaIndex(0);
        setIsFullScreen(false);
    }, [project.id]);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext?.();
            if (e.key === "ArrowLeft") onPrev?.();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose, onNext, onPrev]);


    const nextMedia = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
    };

    const prevMedia = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    };

    // Ensure index is valid
    const safeIndex = currentMediaIndex >= mediaItems.length ? 0 : currentMediaIndex;
    const currentMedia = mediaItems[safeIndex];
    if (!currentMedia) return null;

    // Data Helpers
    const outcomes = (project as Project).outcomes || (project as ResearchItem).achievements;
    const githubUrl = (project as Project).githubUrl;
    const pdfUrl = (project as ResearchItem).pdfUrl;
    const technicalDetails = (project as Project).technicalDetails;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>

            {/* Navigation Arrows (External / Floating) */}
            {onPrev && (
                <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="fixed left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 hidden md:block"
                    aria-label="Previous Project"
                >
                    <ChevronLeft size={48} />
                </button>
            )}
            {onNext && (
                <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="fixed right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 hidden md:block"
                    aria-label="Next Project"
                >
                    <ChevronRight size={48} />
                </button>
            )}

            {/* Modal Container */}
            <div
                className="bg-brand-black w-full max-w-6xl h-[85vh] md:h-[80vh] relative flex flex-col md:grid md:grid-cols-2 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button & Header Navigation (Mobile) */}
                <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                    <div className="flex md:hidden gap-4 mr-4">
                        {onPrev && <button onClick={onPrev} className="text-white hover:text-brand-orange"><ChevronLeft size={24} /></button>}
                        {onNext && <button onClick={onNext} className="text-white hover:text-brand-orange"><ChevronRight size={24} /></button>}
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-black/50 hover:bg-brand-orange text-white rounded-full p-2 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Left Column: Media */}
                <div className="relative h-[40%] md:h-full bg-black flex items-center justify-center group">
                    <div
                        className="relative w-full h-full cursor-zoom-in"
                        onClick={() => setIsFullScreen(true)}
                    >
                        {currentMedia.type === 'image' ? (
                            <div className="relative w-full h-full">
                                <Image
                                    src={currentMedia.url}
                                    alt={currentMedia.caption || project.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent md:hidden" />
                            </div>
                        ) : (
                            <div className="relative w-full h-full bg-black">
                                {getYoutubeEmbedUrl(currentMedia.url) ? (
                                    <iframe
                                        src={getYoutubeEmbedUrl(currentMedia.url)!}
                                        className="w-full h-full pointer-events-none" // Disable pointer events to allow click-to-fullscreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-white">
                                        <div className="text-center">
                                            <p className="mb-2">Click to View Video</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Hover Overlay with Maximize Icon */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <Maximize2 className="text-white drop-shadow-lg" size={48} />
                        </div>
                    </div>

                    {/* Media Navigation */}
                    {mediaItems.length > 1 && (
                        <>
                            <button onClick={prevMedia} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={nextMedia} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRight size={20} />
                            </button>
                            {/* Caption Overlay */}
                            {currentMedia.caption && (
                                <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                                    <span className="bg-black/60 text-white text-xs py-1 px-3 rounded-full backdrop-blur-sm">
                                        {currentMedia.caption}
                                    </span>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Right Column: Content */}
                <div className="h-[60%] md:h-full overflow-y-auto p-6 md:p-10 bg-brand-black md:border-l border-white/10 custom-scrollbar">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                                {project.category}
                            </span>
                            {/* Date or other meta can go here */}
                            {(project as ResearchItem).period && (
                                <span className="text-gray-500 text-xs border border-gray-700 px-2 py-0.5 rounded">
                                    {(project as ResearchItem).period}
                                </span>
                            )}
                        </div>

                        <h2 className="font-display text-3xl md:text-4xl text-white mb-2 leading-tight">
                            {project.title}
                        </h2>

                        {(project as ResearchItem).lab && (
                            <h3 className="font-sans text-brand-orange text-sm font-bold uppercase tracking-wider mb-4">
                                {(project as ResearchItem).lab}
                            </h3>
                        )}

                        <div className="w-12 h-1 bg-brand-orange/50 mt-6" />
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8 font-sans text-gray-300 leading-relaxed text-sm md:text-base">
                        <p className="whitespace-pre-wrap">
                            {project.content || project.description}
                        </p>

                        {/* Tech Details or Overview list */}
                        {technicalDetails && (
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase mb-3">Technical Details</h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-400">
                                    {technicalDetails.map((d, i) => <li key={i}>{d}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* Challenges */}
                        {(project as Project).challenges && (
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase mb-3">Challenges</h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-400">
                                    {(project as Project).challenges!.map((d, i) => <li key={i}>{d}</li>)}
                                </ul>
                            </div>
                        )}


                        {/* Outcomes / Key Stats */}
                        {outcomes && (
                            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                                <h4 className="font-bold text-white text-sm uppercase mb-3 text-center">
                                    {(project as Project).outcomes ? "Key Outcomes" : "Achievements"}
                                </h4>
                                <ul className="space-y-2">
                                    {outcomes.map((item, i) => (
                                        <li key={i} className="flex gap-2 text-sm">
                                            <span className="text-brand-orange font-bold">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-[#24292e] hover:bg-[#2f363d] text-white py-3 px-4 rounded-lg transition-colors font-bold text-sm uppercase"
                            >
                                <Github size={18} />
                                View on GitHub
                            </a>
                        )}
                        {pdfUrl && (
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-colors font-bold text-sm uppercase"
                            >
                                <FileText size={18} />
                                Read Paper
                            </a>
                        )}
                    </div>

                </div>
            </div>
            {/* Full Screen Overlay */}
            {isFullScreen && (
                <div
                    className="fixed inset-0 z-[60] bg-black flex items-center justify-center animate-in fade-in duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFullScreen(false);
                    }}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-brand-orange z-50 p-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFullScreen(false);
                        }}
                    >
                        <X size={32} />
                    </button>

                    <div className="relative w-full h-full max-w-7xl max-h-screen p-4 flex items-center justify-center" onClick={e => e.stopPropagation()}>
                        {currentMedia.type === 'image' ? (
                            <div className="relative w-full h-full">
                                <Image
                                    src={currentMedia.url}
                                    alt={currentMedia.caption || project.title}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                            </div>
                        ) : (
                            <div className="relative w-full h-full max-h-[90vh] aspect-video bg-black">
                                {getYoutubeEmbedUrl(currentMedia.url) ? (
                                    <iframe
                                        src={getYoutubeEmbedUrl(currentMedia.url)!}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-white">
                                        <a href={currentMedia.url} target="_blank" className="text-2xl underline hover:text-brand-orange">Watch on External Site</a>
                                    </div>
                                )}
                            </div>
                        )}

                        {currentMedia.caption && (
                            <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                                <span className="bg-black/70 text-white text-sm py-2 px-4 rounded-full backdrop-blur-md">
                                    {currentMedia.caption}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
