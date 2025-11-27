import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="bg-brand-black min-h-screen text-brand-white p-8 pt-24 flex flex-col items-center justify-center relative">
            <div className="absolute top-8 left-8">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-brand-orange transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>
            </div>
            <div className="max-w-2xl w-full text-center">
                <h1 className="font-display text-5xl md:text-6xl mb-8 text-brand-orange uppercase">Get In Touch</h1>
                <p className="font-sans text-xl text-gray-300 mb-12">
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-gray-900 p-8 border-2 border-brand-white hover:border-brand-orange transition-colors">
                        <h3 className="font-display text-2xl uppercase mb-4">Email</h3>
                        <a href="mailto:cyusashyakapascal@gmail.com" className="text-brand-orange hover:text-white break-all">
                            cyusashyakapascal@gmail.com
                        </a>
                    </div>

                    <div className="bg-gray-900 p-8 border-2 border-brand-white hover:border-brand-orange transition-colors">
                        <h3 className="font-display text-2xl uppercase mb-4">Phone</h3>
                        <p className="text-gray-300">
                            (781) 539-9412
                        </p>
                    </div>
                </div>

                <div className="flex justify-center gap-8">
                    <a href="https://linkedin.com/in/pascal-cyusa" target="_blank" rel="noopener noreferrer" className="text-brand-white hover:text-brand-orange transition-colors uppercase tracking-widest text-sm border-b border-transparent hover:border-brand-orange pb-1">
                        LinkedIn
                    </a>
                    <a href="https://github.com/pascalcyusa" target="_blank" rel="noopener noreferrer" className="text-brand-white hover:text-brand-orange transition-colors uppercase tracking-widest text-sm border-b border-transparent hover:border-brand-orange pb-1">
                        GitHub
                    </a>
                </div>
            </div>
        </main>
    );
}
