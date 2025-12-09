import Image from "next/image";

interface ProjectCardProps {
    title: string;
    subtitle?: string;
    category?: string;
    date?: string;
    image: string;
    onClick?: () => void;
}

export default function ProjectCard({ title, subtitle, category, date, image, onClick }: ProjectCardProps) {
    return (
        <div
            onClick={onClick}
            className="group relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Content Content - Positioned at bottom */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">

                {/* Top Date/Category Badge (if provided) - Imitating the calendar look or just a tag */}
                {(date || category) && (
                    <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2 text-center min-w-[3.5rem]">
                        {date && (
                            <>
                                <span className="block text-lg font-bold text-white font-display">{date}</span>
                            </>
                        )}
                        {!date && category && (
                            <span className="block text-xs font-bold text-white font-sans uppercase tracking-wider">{category}</span>
                        )}
                    </div>
                )}

                {/* Main Text Content */}
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="font-display text-2xl md:text-3xl text-white leading-tight mb-2 drop-shadow-lg">
                        {title}
                    </h3>

                    {subtitle && (
                        <p className="font-sans text-sm text-brand-orange uppercase tracking-widest font-bold mb-1">
                            {subtitle}
                        </p>
                    )}

                    {/* Category as fallback text if not used in badge */}
                    {category && !date && (
                        <p className="font-sans text-xs text-gray-300 line-clamp-2 opacity-80">
                            {category}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
