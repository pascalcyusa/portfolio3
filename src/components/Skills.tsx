import Image from "next/image";

export default function Skills() {
    const skills = ["CAD", "FEA", "MATLAB", "PYTHON", "WEB DEV"];

    return (
        <section className="py-20 bg-brand-black text-brand-white px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-4xl mb-12 uppercase tracking-wide">
                    Skills & Software
                </h2>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {/* Circular Badge with Pattern */}
                            <div className="w-40 h-40 relative flex items-center justify-center mb-4">
                                <div className="absolute inset-0">
                                    <Image
                                        src={index % 2 === 0 ? "/images/artefacts/5.png" : "/images/artefacts/6.png"}
                                        alt="Skill Pattern"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="relative z-10 font-bold font-display text-xl tracking-wider text-brand-white">
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
