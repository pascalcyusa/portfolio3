import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ResumePage() {
    const googleDriveFileId = "1Ml43bkGwuq9RDWQ6aOD3KcOjGCrV6B4P";
    const googleDriveEmbedUrl = `https://drive.google.com/file/d/${googleDriveFileId}/preview`;

    return (
        <main className="bg-brand-black min-h-screen text-brand-white p-4 pt-24 flex flex-col items-center">
            <div className="w-full max-w-5xl mb-8">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-brand-orange transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>
            </div>
            <h1 className="font-display text-4xl md:text-5xl mb-8 text-brand-orange uppercase">Resume</h1>

            <div className="w-full max-w-5xl h-[80vh] border-4 border-brand-white bg-white">
                <iframe
                    src={googleDriveEmbedUrl}
                    className="w-full h-full"
                    title="Resume PDF"
                    allowFullScreen
                />
            </div>

            <a
                href={`https://drive.google.com/file/d/${googleDriveFileId}/view?usp=sharing`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 border-2 border-brand-orange text-brand-orange px-8 py-3 font-sans uppercase tracking-widest hover:bg-brand-orange hover:text-brand-white transition-colors"
            >
                Download PDF
            </a>
        </main>
    );
}
