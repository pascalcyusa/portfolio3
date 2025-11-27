import Link from "next/link";
import Image from "next/image";
import { researchData } from "@/data/research";

export default function ResearchProcess() {
    const featuredResearch = researchData.slice(0, 3);

    return (
        <section className="py-20 bg-brand-black text-brand-white px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl text-center mb-16 uppercase tracking-wide">
                    Research
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredResearch.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-full h-48 border-4 border-brand-orange mb-4 relative overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="font-sans font-bold text-lg uppercase mb-2">{item.title}</h3>
                            <p className="font-sans text-xs md:text-sm text-gray-400 line-clamp-3">
                                {item.description}
                            </p>
                        </div>
                    ))}
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
