import Image from "next/image";
import { researchData } from "@/data/research";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ResearchPage() {
    return (
        <main className="bg-brand-black min-h-screen text-brand-white p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-brand-orange mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>
                <h1 className="font-display text-5xl md:text-6xl mb-12 text-brand-orange uppercase">Research</h1>

                <div className="space-y-16">
                    {researchData.map((item, index) => {
                        // Create a slug for the ID
                        const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                        return (
                            <div key={index} id={slug} className="flex flex-col md:flex-row gap-8 border-b border-gray-800 pb-16 last:border-0 scroll-mt-32">
                                <div className="w-full md:w-1/3 h-64 relative border-4 border-brand-orange flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-grow">
                                    <h2 className="font-display text-3xl uppercase mb-2">{item.title}</h2>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="text-xs font-bold bg-brand-white text-brand-black px-2 py-1 uppercase">{item.category}</span>
                                        <span className="text-xs border border-gray-600 px-2 py-1 uppercase">{item.period}</span>
                                    </div>
                                    <h3 className="font-sans text-sm text-brand-orange mb-4 uppercase tracking-wider">{item.lab}</h3>
                                    <p className="font-sans text-gray-300 mb-6 leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="bg-gray-900 p-4 border-l-2 border-brand-orange">
                                        <h4 className="font-bold text-sm uppercase mb-2">Key Outcomes:</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                            {item.overview.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-6 text-brand-orange hover:text-brand-white transition-colors border-b border-brand-orange hover:border-brand-white pb-1"
                                        >
                                            Read More →
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
