import Link from "next/link";

export default function ResearchProcess() {
    const steps = [
        { title: "Problem Definition", icon: "!" },
        { title: "Buy to Definition", icon: "📋" },
        { title: "Processing", icon: "⚙️" },
        { title: "Sluid Rrifirerment", icon: "🔑" }, // Typo in mockup? Keeping as is or correcting to "Fluid Refinement"? Let's keep generic.
        { title: "Prototyping", icon: "🖨️" },
    ];

    return (
        <section className="py-20 bg-brand-black text-brand-white px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl text-center mb-16 uppercase tracking-wide">
                    Research & Process
                </h2>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12 relative">
                    {/* Connecting Line (simplified) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-brand-orange -z-10 transform -translate-y-1/2" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center bg-brand-black z-10 px-2">
                            <div className="w-24 h-24 border-4 border-brand-orange flex items-center justify-center mb-4 bg-brand-black">
                                <div className="w-20 h-20 border-2 border-brand-white flex items-center justify-center text-3xl">
                                    {step.icon}
                                </div>
                            </div>
                            <p className="font-sans text-xs md:text-sm text-center uppercase max-w-[100px]">
                                {step.title}
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
