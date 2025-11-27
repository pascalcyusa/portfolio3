import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function SelectedProjects() {
    const featuredProjects = projects.slice(0, 3);

    return (
        <section className="py-20 bg-brand-black text-brand-white px-4">
            <div className="max-w-6xl mx-auto border-4 border-brand-orange p-8 relative">
                {/* Decorative Corner Borders (CSS or SVG later) */}

                <h2 className="font-display text-4xl md:text-5xl text-center mb-12 uppercase tracking-wide">
                    Selected Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProjects.map((project, index) => (
                        <div key={index} className="flex flex-col group cursor-pointer">
                            {/* Frame Style Border */}
                            <div className="border-2 border-brand-white p-2 mb-4 transition-transform group-hover:scale-105">
                                <div className="border-2 border-brand-orange p-1">
                                    <div className="bg-gray-800 h-48 w-full relative overflow-hidden">
                                        {/* Use Next.js Image with fill for responsiveness */}
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-sans font-bold text-xl uppercase mb-2 text-brand-white">
                                {project.title}
                            </h3>
                            <p className="font-sans text-sm text-gray-400 line-clamp-3">
                                {project.description}
                            </p>
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
