import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-brand-orange text-brand-white py-12 px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-8 md:mb-0">
                    <Link href="/contact" className="group">
                        <h3 className="font-display text-2xl uppercase mb-2 group-hover:underline decoration-brand-white underline-offset-4">
                            Ready to Build.
                        </h3>
                    </Link>
                    <p className="font-sans text-sm uppercase opacity-90">
                        Seeking full-time opportunities
                        <br />
                        Starting [Month/Year].
                    </p>
                </div>

                <div className="flex gap-6">
                    {/* Social Icons Placeholders */}
                    <div className="w-8 h-8 bg-brand-black rounded-full flex items-center justify-center text-xs">
                        WA
                    </div>
                    <div className="w-8 h-8 bg-brand-black rounded-full flex items-center justify-center text-xs">
                        FB
                    </div>
                    <div className="w-8 h-8 bg-brand-black rounded-full flex items-center justify-center text-xs">
                        IG
                    </div>
                </div>
            </div>
        </footer>
    );
}
