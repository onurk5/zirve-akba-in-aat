"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
      isScrolled || isOpen
        ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm" 
        : "bg-white/30 backdrop-blur-md border-b border-white/20"
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[88px] flex items-center justify-between">
        <Link href="/" className="flex items-center h-full py-2">
          <Image 
            src="/logo.png" 
            alt="Zirve Akbaş İnşaat Logo" 
            width={110} 
            height={50} 
            className={`object-contain transition-all duration-300 ${!isScrolled && !isOpen ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]' : ''}`} 
            priority 
          />
        </Link>
        <nav className="hidden md:flex gap-10">
          <Link href="/" className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 hover:text-[#E58C36] transition-colors">Anasayfa</Link>
          <Link href="/hakkimizda" className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 hover:text-[#E58C36] transition-colors">Hakkımızda</Link>
          <Link href="/projeler" className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 hover:text-[#E58C36] transition-colors">Projelerimiz</Link>
          <Link href="/hizmetler" className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 hover:text-[#E58C36] transition-colors">Hizmetlerimiz</Link>
          <Link href="/iletisim" className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 hover:text-[#E58C36] transition-colors">İletişim</Link>
        </nav>
        <div className="hidden md:flex">
          <Link href="/iletisim" className="bg-[#E58C36] text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all shadow-lg shadow-[#E58C36]/30">
            Teklif Alın
          </Link>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-zinc-900">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-[88px] left-0 w-full bg-white border-b border-gray-200 shadow-xl overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-4 p-6">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 border-b border-gray-100 pb-3">Anasayfa</Link>
          <Link href="/hakkimizda" onClick={() => setIsOpen(false)} className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 border-b border-gray-100 pb-3">Hakkımızda</Link>
          <Link href="/projeler" onClick={() => setIsOpen(false)} className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 border-b border-gray-100 pb-3">Projelerimiz</Link>
          <Link href="/hizmetler" onClick={() => setIsOpen(false)} className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 border-b border-gray-100 pb-3">Hizmetlerimiz</Link>
          <Link href="/iletisim" onClick={() => setIsOpen(false)} className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 border-b border-gray-100 pb-3">İletişim</Link>
          <Link href="/iletisim" onClick={() => setIsOpen(false)} className="bg-[#E58C36] text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-center mt-2 shadow-lg shadow-[#E58C36]/30">
            Teklif Alın
          </Link>
        </div>
      </div>
    </header>
  );
}
