"use client";

import { useState } from "react";
import Image from "next/image";
import { researchData, ResearchItem } from "@/data/research";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectModal from "@/components/ProjectModal";
import ProjectCard from "@/components/ProjectCard";

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
            <div className="max-w-6xl mx-auto">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredData.map((item, index) => (
                        <ProjectCard
                            key={index}
                            title={item.title}
                            subtitle={item.lab}
                            category={item.category}
                            date={item.period}
                            image={item.image}
                            onClick={() => setSelectedItem(item)}
                        />
                    ))}
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
