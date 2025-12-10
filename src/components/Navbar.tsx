"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Drill, X } from 'lucide-react';

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => pathname === path;

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}
        >
            <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between bg-brand-black/40 backdrop-blur-md rounded-b-2xl border-b border-white/5 shadow-lg">

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 font-sans text-sm tracking-wider uppercase text-brand-white/80 font-bold">
                    <Link
                        href="/"
                        className={`hover:text-brand-orange transition-colors ${isActive('/') ? 'text-brand-orange' : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/projects"
                        className={`hover:text-brand-orange transition-colors ${isActive('/projects') ? 'text-brand-orange' : ''}`}
                    >
                        Projects
                    </Link>
                    <Link
                        href="/research"
                        className={`hover:text-brand-orange transition-colors ${isActive('/research') ? 'text-brand-orange' : ''}`}
                    >
                        Research
                    </Link>
                </div>

                {/* Mobile Toggle Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden ml-auto text-brand-white hover:text-brand-orange transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Drill size={28} className={isMobileMenuOpen ? "animate-spin" : ""} />}
                </button>

                {/* Contact Action (Desktop) */}
                <div className="hidden md:block">
                    <Link
                        href="/contact"
                        className="font-display uppercase tracking-widest text-xs px-6 py-2 border border-brand-white/30 rounded-full hover:bg-brand-white hover:text-brand-black transition-all duration-300 font-bold"
                    >
                        Contact
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-brand-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl md:hidden flex flex-col items-center py-8 space-y-8 animate-in slide-in-from-top-5 duration-300">
                    <Link
                        href="/"
                        onClick={closeMobileMenu}
                        className={`font-sans text-lg tracking-wider uppercase font-bold ${isActive('/') ? 'text-brand-orange' : 'text-brand-white'}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/projects"
                        onClick={closeMobileMenu}
                        className={`font-sans text-lg tracking-wider uppercase font-bold ${isActive('/projects') ? 'text-brand-orange' : 'text-brand-white'}`}
                    >
                        Projects
                    </Link>
                    <Link
                        href="/research"
                        onClick={closeMobileMenu}
                        className={`font-sans text-lg tracking-wider uppercase font-bold ${isActive('/research') ? 'text-brand-orange' : 'text-brand-white'}`}
                    >
                        Research
                    </Link>
                    <Link
                        href="/contact"
                        onClick={closeMobileMenu}
                        className="font-display uppercase tracking-widest text-sm px-8 py-3 border border-brand-white/30 rounded-full hover:bg-brand-white hover:text-brand-black transition-all duration-300 font-bold"
                    >
                        Contact
                    </Link>
                </div>
            )}
        </nav>
    );
}
