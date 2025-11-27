import Image from "next/image";
import Link from "next/link";

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
                    src="/images/lower.jpg"
                    alt="Lower Texture Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex-grow max-w-7xl mx-auto w-full px-4 grid grid-cols-1 md:grid-cols-12 h-screen">

                {/* Image Section - Overlapping Split */}
                <div className="md:col-span-5 flex items-end justify-center md:justify-start h-full pb-0 md:pb-0 order-2 md:order-1 relative">
                    <div className="relative w-[400px] h-[500px] md:w-[800px] md:h-[1000px] z-20 translate-y-[10%] md:translate-y-[15%]">
                        <div className="relative w-full h-full rounded-t-full md:rounded-none overflow-hidden shadow-2xl border-4 border-brand-black md:border-none">
                            <Image
                                src="/images/profile.png"
                                alt="Jean Pascal Cyusa Shyaka"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Typography Section - Top Half */}
                <div className="md:col-span-7 flex flex-col justify-center md:justify-start pt-32 md:pt-40 text-center md:text-right order-1 md:order-2">
                    <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.8] uppercase text-brand-white mb-6">
                        Mechanical
                        <br />
                        <span className="text-brand-white">Engineer.</span>
                    </h1>

                    <h2 className="font-display text-xl md:text-3xl tracking-widest uppercase text-brand-white mb-2">
                        Designer. Researcher.
                    </h2>

                    <Link href="/resume" className="group inline-block">
                        <p className="font-sans text-lg md:text-xl text-brand-orange uppercase group-hover:text-brand-white transition-colors">
                            Graduating 2026
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}
