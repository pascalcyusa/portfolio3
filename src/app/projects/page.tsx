"use client";

import Image from "next/image";
import { projects, Project } from "@/data/projects";
import { useState } from "react";
import ProjectModal from "@/components/ProjectModal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Get unique categories
    const categories = Array.from(new Set(projects.map((p) => p.category)));

    // Filter projects
    const filteredProjects = selectedCategory
        ? projects.filter((p) => p.category === selectedCategory)
        : projects;

    return (
        <main className="bg-brand-black min-h-screen text-brand-white p-8 pt-24">
            <div className="max-w-6xl mx-auto">
                {/* Back to Home Navigation */}
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-brand-orange mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>

                <h1 className="font-display text-5xl md:text-6xl mb-8 text-brand-orange uppercase">All Projects</h1>

                {/* Filter Badges */}
                <div className="flex flex-wrap gap-4 mb-12">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-full border border-brand-white text-sm uppercase tracking-wider transition-colors ${selectedCategory === null
                            ? "bg-brand-orange border-brand-orange text-white"
                            : "hover:bg-gray-800"
                            }`}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full border border-brand-white text-sm uppercase tracking-wider transition-colors ${selectedCategory === category
                                ? "bg-brand-orange border-brand-orange text-white"
                                : "hover:bg-gray-800"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            className="flex flex-col group border-2 border-brand-white p-4 hover:border-brand-orange transition-colors cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="h-64 w-full relative mb-4 overflow-hidden bg-gray-800">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="font-display text-2xl uppercase">{project.title}</h2>
                                {/* Fixed Year Tag Styling: prevent overflow and ensure consistency */}
                                {project.year && (
                                    <span className="font-sans text-xs text-brand-orange border border-brand-orange px-2 py-1 rounded-full whitespace-nowrap ml-2 flex-shrink-0">
                                        {project.year}
                                    </span>
                                )}
                            </div>
                            <p className="font-sans text-sm text-gray-400 mb-4 flex-grow line-clamp-3">{project.description}</p>

                            <div className="mt-auto">
                                <h3 className="font-bold text-xs uppercase text-brand-white mb-2">Key Aspects:</h3>
                                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                                    {project.overview.slice(0, 3).map((item, i) => (
                                        <li key={i} className="truncate">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-4 text-center border border-brand-white py-2 uppercase text-xs font-bold group-hover:bg-brand-white group-hover:text-brand-black transition-colors">
                                View Details
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </main>
    );
}
