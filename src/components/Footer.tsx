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
                    <a href="mailto:cyusashyakapascal@gmail.com" className="w-10 h-10 bg-brand-black rounded-full flex items-center justify-center text-xs hover:bg-brand-white hover:text-brand-black transition-colors">
                        Mail
                    </a>
                    <a href="https://linkedin.com/in/pascal-cyusa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-brand-black rounded-full flex items-center justify-center text-xs hover:bg-brand-white hover:text-brand-black transition-colors">
                        IN
                    </a>
                    <a href="https://github.com/pascalcyusa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-brand-black rounded-full flex items-center justify-center text-xs hover:bg-brand-white hover:text-brand-black transition-colors">
                        GH
                    </a>
                </div>
            </div>
            <div className="text-center mt-8 text-xs opacity-70 font-sans">
                &copy; {new Date().getFullYear()} Jean Pascal Cyusa Shyaka. All rights reserved.
            </div>
        </footer>
    );
}

