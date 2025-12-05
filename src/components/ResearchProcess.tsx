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
                    {featuredResearch.map((item, index) => {
                        // Create a slug for the ID
                        const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                        return (
                            <div key={index} className="flex flex-col items-center text-center">
                                <Link href={`/research#${slug}`} className="w-full" aria-label={`View research: ${item.title}`}>
                                    {/* Frame Style Border with Pattern */}
                                    <div className="relative w-full aspect-[4/3] mb-4 p-6 flex items-center justify-center cursor-pointer group">
                                        {/* Frame Background */}
                                        <div className="absolute inset-0 z-0">
                                            <Image
                                                src="/images/artefacts/10.png"
                                                alt="Research Frame"
                                                fill
                                                className="object-fill"
                                            />
                                        </div>

                                        {/* Research Image */}
                                        <div className="relative w-[85%] h-[80%] z-10 overflow-hidden bg-gray-800">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>
                                </Link>
                                <h3 className="font-sans font-bold text-lg uppercase mb-2">{item.title}</h3>
                                <p className="font-sans text-xs md:text-sm text-gray-400 line-clamp-3">
                                    {item.description}
                                </p>
                            </div>
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
