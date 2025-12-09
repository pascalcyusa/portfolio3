import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function SelectedProjects() {
    const featuredProjects = projects.slice(0, 3);

    return (
        <section className="py-20 bg-brand-black text-brand-white px-4">
            <div className="max-w-6xl mx-auto p-8 relative">
                {/* Decorative Corner Borders (CSS or SVG later) */}

                <h2 className="font-display text-4xl md:text-5xl text-center mb-12 uppercase tracking-wide">
                    Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProjects.map((project, index) => (
                        <div key={index} className="w-full">
                            <Link href={`/projects?project=${project.id}`} aria-label={`View project: ${project.title}`}>
                                <ProjectCard
                                    title={project.title}
                                    category={project.category}
                                    date={project.year} // Using year as date
                                    image={project.image}
                                />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/projects"
                        className="inline-block border-2 border-brand-orange text-brand-orange px-8 py-3 font-sans uppercase tracking-widest hover:bg-brand-orange hover:text-brand-white transition-colors"
                    >
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
}
