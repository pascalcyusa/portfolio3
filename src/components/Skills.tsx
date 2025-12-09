import Image from "next/image";

export default function Skills() {
    const skillCategories = [
        {
            title: "Technical",
            skills: [
                "CAD",
                "FEA",
                "3D Printing",
                "Laser Cutting",
                "Soldering",
                "PCB Design",
                "GD&T",
                "ROS 2"
            ]
        },
        {
            title: "Programming",
            skills: [
                "Python",
                "C/C++",
                "MATLAB",
                "LabVIEW",
                "JavaScript",
                "React",
                "HTML/CSS"
            ]
        }
    ];

    return (
        <section className="py-20 bg-brand-black text-brand-white px-4 overflow-hidden">
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                .pause-on-hover:hover .animate-scroll {
                    animation-play-state: paused;
                }
            `}</style>
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-4xl mb-16 uppercase tracking-wide">
                    Skills & Software
                </h2>

                <div className="space-y-16">
                    {skillCategories.map((category, catIndex) => (
                        <div key={catIndex}>
                            <h3 className="font-sans text-2xl text-brand-orange mb-8 uppercase tracking-widest font-bold">
                                {category.title}
                            </h3>

                            {/* Constrained container for the scrolling effect (approx 5 items wide) */}
                            <div className="max-w-5xl mx-auto overflow-hidden relative pause-on-hover px-8">
                                {/* Gradient fade effects on edges */}
                                <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-brand-black to-transparent z-20 pointer-events-none"></div>
                                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-brand-black to-transparent z-20 pointer-events-none"></div>

                                <div className="flex animate-scroll w-max hover:cursor-pointer">
                                    {/* Duplicate skills for seamless loop */}
                                    {[...category.skills, ...category.skills].map((skill, index) => (
                                        <div key={index} className="flex flex-col items-center mx-6">
                                            {/* Circular Badge with Pattern - Fixed width ensures layout stability */}
                                            <div className="w-40 h-40 relative flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
                                                <div className="absolute inset-0">
                                                    <Image
                                                        src={(catIndex * 10 + index) % 2 === 0 ? "/images/artefacts/5.png" : "/images/artefacts/6.png"}
                                                        alt="Skill Pattern"
                                                        fill
                                                        className="object-contain opacity-80"
                                                    />
                                                </div>
                                                <span className="relative z-10 font-bold font-display text-lg px-4 tracking-wider text-brand-white break-words w-full">
                                                    {skill}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}
