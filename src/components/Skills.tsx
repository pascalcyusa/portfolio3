export default function Skills() {
    const skills = ["CAD", "FEA", "MATLAB", "PYTHON"];

    return (
        <section className="py-20 bg-brand-black text-brand-white px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-4xl mb-12 uppercase tracking-wide">
                    Skills & Software
                </h2>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {/* Circular Badge */}
                            <div className="w-32 h-32 rounded-full border-4 border-brand-orange flex items-center justify-center mb-4 relative">
                                <div className="absolute inset-1 rounded-full border-2 border-brand-white border-dashed animate-spin-slow" />
                                <span className="font-bold font-sans text-lg tracking-wider">
                                    {skill}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
