"use client";

import { useState } from "react";
import Image from "next/image";
import { researchData, ResearchItem } from "@/data/research";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectModal from "@/components/ProjectModal";

export default function ResearchPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);

    // Get unique categories
    const categories = Array.from(new Set(researchData.map((item) => item.category)));

    // Filter items
    const filteredData = selectedCategory
        ? researchData.filter((item) => item.category === selectedCategory)
        : researchData;

    return (
        <main className="bg-brand-black min-h-screen text-brand-white p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-brand-orange mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>
                <h1 className="font-display text-5xl md:text-6xl mb-8 text-brand-orange uppercase">Research</h1>

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

                <div className="space-y-16">
                    {filteredData.map((item, index) => {
                        // Create a slug for the ID
                        const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                        return (
                            <div key={index} id={slug} className="flex flex-col md:flex-row gap-8 border-b border-gray-800 pb-16 last:border-0 scroll-mt-32">
                                <div
                                    className="w-full md:w-1/3 h-64 relative border-4 border-brand-orange flex-shrink-0 cursor-pointer group"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="uppercase font-bold text-white border border-white px-3 py-1 text-sm">View Details</span>
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <h2
                                        className="font-display text-3xl uppercase mb-2 cursor-pointer hover:text-brand-orange transition-colors w-fit"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        {item.title}
                                    </h2>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="text-xs font-bold bg-brand-white text-brand-black px-2 py-1 uppercase">{item.category}</span>
                                        <span className="text-xs border border-gray-600 px-2 py-1 uppercase">{item.period}</span>
                                    </div>
                                    <h3 className="font-sans text-sm text-brand-orange mb-4 uppercase tracking-wider">{item.lab}</h3>
                                    <p className="font-sans text-gray-300 mb-6 leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="bg-gray-900 p-4 border-l-2 border-brand-orange mb-6">
                                        <h4 className="font-bold text-sm uppercase mb-2">Key Outcomes:</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                            {item.overview.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setSelectedItem(item)}
                                            className="text-brand-orange hover:text-brand-white transition-colors border-b border-brand-orange hover:border-brand-white pb-1 font-bold text-sm uppercase"
                                        >
                                            View Details
                                        </button>

                                        {item.link && (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-white transition-colors border-b border-gray-600 hover:border-white pb-1 text-sm uppercase"
                                            >
                                                External Link →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal */}
            {selectedItem && (
                <ProjectModal
                    project={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </main>
    );
}
