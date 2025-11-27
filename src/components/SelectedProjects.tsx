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
                        <div key={index} className="flex flex-col group cursor-pointer items-center">
                            {/* Frame Style Border with Pattern */}
                            <div className="relative w-full aspect-[4/3] mb-4 p-6 flex items-center justify-center">
                                {/* Frame Background */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="/images/artefacts/10.png"
                                        alt="Project Frame"
                                        fill
                                        className="object-fill"
                                    />
                                </div>

                                {/* Project Image */}
                                <div className="relative w-[85%] h-[80%] z-10 overflow-hidden bg-gray-800">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
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
