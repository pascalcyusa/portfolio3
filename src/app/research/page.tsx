"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { researchData, ResearchItem } from "@/data/research";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectModal from "@/components/ProjectModal";
import ProjectCard from "@/components/ProjectCard";
import { useSearchParams } from "next/navigation";

function ResearchContent() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);
    const searchParams = useSearchParams();

    // Handle deep linking
    useEffect(() => {
        const id = searchParams.get("id");
        if (id) {
            const item = researchData.find((r) => r.id === id);
            if (item) setSelectedItem(item);
        }
    }, [searchParams]);

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

                <p className="font-sans text-gray-400 mb-12 max-w-2xl leading-relaxed">
                    Exploring the intersection of robotics, embedded systems, and engineering education.
                    My research focuses on developing novel sensors, automated systems, and accessible STEM curricula.
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-4 mb-16">
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

            {selectedItem && (
                <ProjectModal
                    key={selectedItem.id}
                    project={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onNext={() => {
                        const currentIndex = filteredData.findIndex(item => item.id === selectedItem.id);
                        const nextIndex = (currentIndex + 1) % filteredData.length;
                        setSelectedItem(filteredData[nextIndex]);
                    }}
                    onPrev={() => {
                        const currentIndex = filteredData.findIndex(item => item.id === selectedItem.id);
                        const prevIndex = (currentIndex - 1 + filteredData.length) % filteredData.length;
                        setSelectedItem(filteredData[prevIndex]);
                    }}
                />
            )}
        </main>
    );
}

export default function ResearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-brand-black flex items-center justify-center text-white">Loading...</div>}>
            <ResearchContent />
        </Suspense>
    );
}
