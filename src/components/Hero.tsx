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
            <div className="relative z-10 flex-grow max-w-7xl mx-auto w-full px-4 h-screen">

                {/* Profile Image - Centered on Split Line */}
                <div className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 z-20">
                    <div className="relative w-[300px] h-[400px] md:w-[500px] md:h-[700px]">
                        <div className="relative w-full h-full rounded-t-full md:rounded-none overflow-hidden shadow-2xl border-4 border-brand-black md:border-none flex items-center justify-center">
                            <div className="relative w-full h-full md:w-[90%] md:h-[90%]">
                                <Image
                                    src="/images/profile.jpg"
                                    alt="Jean Pascal Cyusa Shyaka"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {/* Frame Overlay */}
                            <div className="absolute inset-0 z-30 pointer-events-none hidden md:block">
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
                <div className="absolute top-0 right-4 md:right-12 w-full md:w-1/2 h-1/2 flex flex-col justify-center items-end text-right z-30 pt-20">
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-brand-white mb-2 tracking-tighter">
                        MECHANICAL
                        <br />
                        <span className="text-brand-orange">ENGINEER.</span>
                    </h1>
                    <div className="flex flex-col items-end gap-1 mb-6">
                        <h2 className="font-sans text-xl md:text-2xl text-gray-300 tracking-widest uppercase">
                            Jean Pascal
                        </h2>
                        <h2 className="font-sans text-xl md:text-2xl text-brand-white font-bold tracking-widest uppercase">
                            Cyusa Shyaka
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/resume"
                            className="group flex items-center gap-2 text-brand-white hover:text-brand-orange transition-colors"
                        >
                            <span className="font-sans text-sm tracking-widest uppercase border-b border-brand-orange pb-1">
                                Graduating May 2025
                            </span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
