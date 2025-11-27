import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-brand-black text-brand-white p-4">
            {/* Background Pattern Placeholder - Spiral */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
                {/* Simple CSS radial repeating gradient to mimic spiral/circles for now */}
                <div
                    className="w-[200vw] h-[200vw] rounded-full"
                    style={{
                        background:
                            "repeating-radial-gradient(circle, var(--color-brand-orange), var(--color-brand-orange) 20px, transparent 20px, transparent 40px)",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left: Image Placeholder */}
                <div className="order-2 md:order-1 flex justify-center md:justify-start">
                    <div className="relative w-64 h-80 md:w-80 md:h-96 bg-gray-800 rounded-lg overflow-hidden border-4 border-brand-orange">
                        {/* Placeholder for Engineer Image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                            [Engineer Image]
                        </div>
                    </div>
                </div>

                {/* Right: Text Content */}
                <div className="order-1 md:order-2 text-center md:text-right flex flex-col items-center md:items-end">
                    <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-none uppercase text-brand-white mb-4">
                        Mechanical
                        <br />
                        <span className="text-brand-white">Engineer.</span>
                    </h1>
                    <h2 className="font-sans text-xl md:text-2xl tracking-widest uppercase mb-2 text-brand-white">
                        Designer. Researcher.
                    </h2>
                    <Link href="/resume" className="group">
                        <p className="font-sans text-lg text-brand-orange uppercase group-hover:text-brand-white transition-colors">
                            Graduating [Year] <span className="ml-2">→</span>
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}

