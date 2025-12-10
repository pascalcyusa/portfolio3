"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import { projects, Project } from "@/data/projects";
import ProjectModal from "@/components/ProjectModal";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ProjectsContent() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const searchParams = useSearchParams();

    // Handle deep linking via query param
    useEffect(() => {
        const projectId = searchParams.get("project");
        if (projectId) {
            const project = projects.find((p) => p.id === projectId);
            if (project) {
                setSelectedProject(project);
            }
        }
    }, [searchParams]);

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
                        <ProjectCard
                            key={index}
                            title={project.title}
                            category={project.category}
                            date={project.year}
                            image={project.image}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <ProjectModal
                    key={selectedProject.id}
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                    onNext={() => {
                        const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
                        const nextIndex = (currentIndex + 1) % filteredProjects.length;
                        setSelectedProject(filteredProjects[nextIndex]);
                    }}
                    onPrev={() => {
                        const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
                        const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
                        setSelectedProject(filteredProjects[prevIndex]);
                    }}
                />
            )}
        </main>
    );
}

export default function ProjectsPage() {
    return (
        <Suspense fallback={<div className="bg-brand-black min-h-screen text-brand-white p-8 pt-24">Loading...</div>}>
            <ProjectsContent />
        </Suspense>
    );
}
