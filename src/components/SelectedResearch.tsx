import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { ResearchItem } from "@/types";

export default function SelectedResearch({ research }: { research: ResearchItem[] }) {
    const featuredResearch = research.slice(0, 3);

    return (
        <section className="py-20 bg-brand-black text-brand-white px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl text-center mb-16 uppercase tracking-wide">
                    Research
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredResearch.map((item, index) => {
                        return (
                            <Link key={index} href={`/research?id=${item.id}`} className="w-full" aria-label={`View research: ${item.title}`}>
                                <ProjectCard
                                    title={item.title}
                                    subtitle={item.lab}
                                    category={item.category}
                                    date={item.period}
                                    image={item.image}
                                />
                            </Link>
                        );
                    })}
                </div>

                <div className="text-center mt-16">
                    <Link
                        href="/research"
                        className="inline-block border-2 border-brand-orange text-brand-orange px-8 py-3 font-sans uppercase tracking-widest hover:bg-brand-orange hover:text-brand-white transition-colors"
                    >
                        View Research
                    </Link>
                </div>
            </div>
        </section>
    );
}
