import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col bg-brand-black overflow-hidden">
            {/* Top Half - Upper Texture Background */}
            <div className="absolute top-0 left-0 w-full h-1/2 z-0">
                <Image
                    src="/images/upper.jpg"
                    alt="Upper Texture Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Bottom Half - Lower Texture Background */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 z-0">
                <Image
                    src="/images/upper.jpg"
                    alt="Lower Texture Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex-grow max-w-7xl mx-auto w-full px-4 h-full flex flex-col md:block justify-center">

                {/* Profile Image - Centered on Split Line */}
                <div className="relative md:absolute md:top-1/2 left-0 md:left-12 md:-translate-y-1/2 z-20 flex justify-center md:block mb-8 md:mb-0 mt-20 md:mt-0">
                    <div className="relative w-[280px] h-[380px] md:w-[450px] md:h-[650px]">
                        <div className="relative w-full h-full overflow-hidden shadow-2xl flex items-center justify-center">
                            <div className="relative w-[85%] h-[85%]">
                                <Image
                                    src="/images/profile.jpg"
                                    alt="Jean Pascal Cyusa Shyaka"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {/* Frame Overlay */}
                            <div className="absolute inset-0 z-30 pointer-events-none">
                                <Image
                                    src="/images/artefacts/10.png"
                                    alt="Frame"
                                    fill
                                    className="object-fill"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Content - Top Half */}
                <div className="relative md:absolute md:top-0 md:right-12 w-full md:w-1/2 md:h-1/2 flex flex-col justify-center items-center md:items-end text-center md:text-right z-30 pt-4 md:pt-20 pb-10 md:pb-0">
                    <h1 className="font-display text-4xl md:text-7xl lg:text-8xl text-brand-white mb-2 tracking-tighter">
                        MECHANICAL
                        <br />
                        <span className="text-brand-orange">ENGINEER.</span>
                    </h1>
                    <div className="flex flex-col items-center md:items-end gap-1 mb-6">
                        <h2 className="font-sans text-lg md:text-2xl text-gray-300 tracking-widest uppercase">
                            Jean Pascal
                        </h2>
                        <h2 className="font-sans text-lg md:text-2xl text-brand-white font-bold tracking-widest uppercase">
                            Cyusa Shyaka
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/resume"
                            className="group flex items-center gap-2 text-brand-white hover:text-brand-orange transition-colors"
                        >
                            <span className="font-sans text-sm tracking-widest uppercase border-b border-brand-orange pb-1">
                                MY RESUME
                            </span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
