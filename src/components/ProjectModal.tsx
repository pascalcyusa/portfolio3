"use client";

import { Project } from "@/data/projects";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const images = project.images && project.images.length > 0
        ? project.images
        : [{ url: project.image, caption: project.title }];

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-brand-black border-2 border-brand-orange w-full max-w-5xl max-h-[90vh] overflow-y-auto relative flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 text-brand-white hover:text-brand-orange transition-colors"
                >
                    <X size={32} />
                </button>

                <div className="p-6 md:p-10">
                    <h2 className="font-display text-3xl md:text-5xl uppercase text-brand-orange mb-2">{project.title}</h2>
                    <p className="font-sans text-gray-400 mb-8 uppercase tracking-widest text-sm">{project.category}</p>

                    {/* Image Gallery */}
                    <div className="relative w-full h-[40vh] md:h-[60vh] bg-gray-900 mb-8 border border-gray-800 group">
                        <Image
                            src={images[currentImageIndex].url}
                            alt={images[currentImageIndex].caption || project.title}
                            fill
                            className="object-contain"
                        />

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-brand-orange transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-brand-orange transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}

                        {images[currentImageIndex].caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center text-sm text-gray-300">
                                {images[currentImageIndex].caption}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h3 className="font-display text-xl uppercase text-brand-white mb-4">Overview</h3>
                                <p className="font-sans text-gray-300 leading-relaxed">
                                    {project.content || project.description}
                                </p>
                            </div>

                            {project.technicalDetails && (
                                <div>
                                    <h3 className="font-display text-xl uppercase text-brand-white mb-4">Technical Details</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-400 font-sans text-sm">
                                        {project.technicalDetails.map((detail, i) => (
                                            <li key={i}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {project.challenges && (
                                <div>
                                    <h3 className="font-display text-xl uppercase text-brand-white mb-4">Challenges</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-400 font-sans text-sm">
                                        {project.challenges.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="space-y-8">
                            {project.outcomes && (
                                <div className="bg-gray-900 p-6 border-l-2 border-brand-orange">
                                    <h3 className="font-display text-lg uppercase text-brand-white mb-4">Key Outcomes</h3>
                                    <ul className="space-y-3 text-gray-400 font-sans text-sm">
                                        {project.outcomes.map((item, i) => (
                                            <li key={i} className="flex gap-2">
                                                <span className="text-brand-orange">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {project.futureImprovements && (
                                <div>
                                    <h3 className="font-display text-lg uppercase text-brand-white mb-4">Future Improvements</h3>
                                    <ul className="space-y-2 text-gray-400 font-sans text-sm">
                                        {project.futureImprovements.map((item, i) => (
                                            <li key={i}>- {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center border-2 border-brand-white py-3 font-bold uppercase hover:bg-brand-white hover:text-brand-black transition-colors"
                                >
                                    View on GitHub
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
