"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar({ logoUrl = "/logo.png" }: { logoUrl?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isKurumsalOpen, setIsKurumsalOpen] = useState(false);

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
            src={logoUrl} 
            alt="Zirve Akbaş İnşaat Logo" 
            width={110} 
            height={50} 
            className={`object-contain transition-all duration-300 ${!isScrolled && !isOpen ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]' : ''}`} 
            priority 
          />
        </Link>
        <nav className="hidden md:flex gap-10">
          <Link href="/" className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 hover:text-[#E58C36] transition-colors">Anasayfa</Link>
          
          {/* Dropdown Menu */}
          <div className="relative group flex items-center h-full">
            <button className="flex items-center gap-1 text-sm font-extrabold uppercase tracking-widest text-zinc-900 group-hover:text-[#E58C36] transition-colors h-full">
              Kurumsal <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute left-0 top-full -ml-4 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0">
              <div className="bg-white/95 backdrop-blur-xl border border-zinc-100 border-t-2 border-t-[#E58C36] shadow-2xl rounded-2xl overflow-hidden flex flex-col p-2">
                <Link href="/hakkimizda" className="group/link flex items-center px-4 py-3 rounded-xl hover:bg-zinc-50 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover/link:bg-[#E58C36] group-hover/link:scale-150 transition-all mr-3"></span>
                  <span className="text-sm font-bold text-zinc-700 group-hover/link:text-[#E58C36] transition-colors">Hakkımızda</span>
                </Link>
                <Link href="/haberler" className="group/link flex items-center px-4 py-3 rounded-xl hover:bg-zinc-50 transition-colors mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover/link:bg-[#E58C36] group-hover/link:scale-150 transition-all mr-3"></span>
                  <span className="text-sm font-bold text-zinc-700 group-hover/link:text-[#E58C36] transition-colors">Haberler & Blog</span>
                </Link>
              </div>
            </div>
          </div>

          <Link href="/projeler" className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 hover:text-[#E58C36] transition-colors">Projelerimiz</Link>
          <Link href="/hizmetler" className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 hover:text-[#E58C36] transition-colors">Hizmetlerimiz</Link>
          <Link href="/iletisim" className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 hover:text-[#E58C36] transition-colors">İletişim</Link>
        </nav>
        <div className="hidden md:flex">
          <Link href="/iletisim" className="bg-[#E58C36] text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all shadow-lg shadow-[#E58C36]/30">
            Teklif Alın
          </Link>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-zinc-900 relative z-50" aria-label="Menü">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-[88px] left-0 w-full bg-white border-b border-zinc-200 shadow-2xl max-h-[calc(100vh-88px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4 p-6">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 border-b border-gray-100 pb-3">Anasayfa</Link>
            
            <div className="flex flex-col border-b border-gray-100 pb-4 pt-1">
              <button 
                onClick={() => setIsKurumsalOpen(!isKurumsalOpen)} 
                className="flex items-center justify-between w-full text-sm font-extrabold uppercase tracking-widest text-zinc-900 py-2"
              >
                Kurumsal
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isKurumsalOpen ? "rotate-180 text-[#E58C36]" : ""}`} />
              </button>
              
              <div className={`flex flex-col overflow-hidden transition-all duration-300 ${isKurumsalOpen ? "max-h-[200px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                <div className="bg-zinc-50/50 rounded-2xl p-4">
                  <Link href="/hakkimizda" onClick={() => setIsOpen(false)} className="text-sm font-bold text-zinc-700 hover:text-[#E58C36] transition-colors flex items-center gap-3 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E58C36]"></span> Hakkımızda
                  </Link>
                  <Link href="/haberler" onClick={() => setIsOpen(false)} className="text-sm font-bold text-zinc-700 hover:text-[#E58C36] transition-colors flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E58C36]"></span> Haberler & Blog
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/projeler" onClick={() => setIsOpen(false)} className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 border-b border-gray-100 pb-3 pt-3">Projelerimiz</Link>
            <Link href="/hizmetler" onClick={() => setIsOpen(false)} className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 border-b border-gray-100 pb-3">Hizmetlerimiz</Link>
            <Link href="/iletisim" onClick={() => setIsOpen(false)} className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 border-b border-gray-100 pb-3">İletişim</Link>
            <Link href="/iletisim" onClick={() => setIsOpen(false)} className="bg-[#E58C36] text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-center mt-2 shadow-lg shadow-[#E58C36]/30">
              Teklif Alın
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
