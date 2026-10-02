"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { id: 1, image: '/hero-bg.jpg' },
  { id: 2, image: '/hero-bg-2.jpg' },
  { id: 3, image: '/hero-bg-3.jpg' }
];

type ProjectType = {
  id: string;
  title: string;
  slug: string;
  status: string;
  afterImage: string | null;
};

export function HeroSlider({ projects }: { projects: ProjectType[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 saniyede bir değişsin
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full min-h-screen flex items-center bg-zinc-950 overflow-hidden">
      {/* Background Images Slider */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 z-0 transition-all duration-[2000ms] ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        >
          <Image
            src={slide.image}
            alt="Zirve Akbaş İnşaat"
            fill
            priority={index === 0}
            quality={90}
            className="object-cover"
          />
        </div>
      ))}

      {/* Multi-layered Gradients for Text Readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-zinc-950/95 via-zinc-900/70 to-transparent transition-opacity duration-1000"></div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent"></div>
      <div className="absolute inset-0 z-[1] bg-black/30"></div>
      
      <div className="w-full max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-32 lg:pt-20">
        
        {/* Left Side Content */}
        <div className="lg:col-span-12 max-w-4xl space-y-8">
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2]">
            KALICI DEĞERİ <br/>
            <span className="text-[#E58C36] font-serif italic pr-2">ZARAFETLE</span>
            İNŞA<br/>
            EDİYORUZ.
          </h1>
          
          <p className="text-lg text-zinc-300 leading-relaxed max-w-xl font-light">
            12 yılı aşkın deneyimimizle mimari zarafeti mühendislik hassasiyetiyle birleştiriyor; sadece binalar değil, nesiller boyu yaşayacak evler tasarlıyoruz.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/projeler" className="bg-[#E58C36] text-white px-8 py-4 rounded-sm font-medium hover:bg-[#d47b25] transition-all flex items-center justify-center gap-3 text-sm tracking-widest uppercase">
              PROJELERİ KEŞFEDİN <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/iletisim" className="bg-transparent text-white border border-zinc-600 px-8 py-4 rounded-sm font-medium hover:bg-white/10 hover:border-zinc-400 transition-all flex items-center justify-center text-sm tracking-widest uppercase">
              BİZE ULAŞIN
            </Link>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-4 pt-8">
            <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-zinc-600 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <div key={idx} onClick={() => setCurrentSlide(idx)} className={`h-1.5 rounded-full cursor-pointer transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-[#E58C36]' : 'w-4 bg-zinc-600 hover:bg-zinc-400'}`} />
              ))}
            </div>
            <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-zinc-600 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Side Sidebar (Projects List) - Şimdilik Gizlendi */}
        <div className="hidden">
          <div className="flex flex-col gap-3 ml-auto w-full max-w-[420px]">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Link href={`/projeler/${project.slug}`} key={project.id} className="group relative overflow-hidden bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/70 hover:border-zinc-600 transition-all p-5 flex items-center justify-between shadow-xl">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.afterImage || '/hero-bg.jpg'})` }}
                  />
                  <div className="relative z-10">
                    <h3 className="text-white font-semibold text-lg tracking-wide">{project.title}</h3>
                    <p className={`text-xs font-bold tracking-widest uppercase mt-1 ${project.status === 'Tamamlandı' ? 'text-[#44b7d5]' : 'text-[#E58C36]'}`}>
                      {project.status}
                    </p>
                  </div>
                  <ArrowRight className="text-zinc-500 group-hover:text-white transition-colors w-5 h-5 relative z-10" />
                </Link>
              ))
            ) : (
              /* Empty State dummy data */
              [
                { title: "Ala Çamlıca Konakları", status: "Tamamlandı" },
                { title: "Yeni Eyüp Evleri 1", status: "Tamamlandı" },
                { title: "Yeni Eyüp Evleri 2", status: "Devam Eden" },
                { title: "Çağdaş Residence - Kozyatağı", status: "Tamamlandı" },
                { title: "Axis Fikermi Projesi", status: "Altın Vize Fırsatı" }
              ].map((proj, idx) => (
                <div key={idx} className="group relative overflow-hidden bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-500 transition-all p-5 flex items-center justify-between cursor-pointer">
                  <div className="relative z-10">
                    <h3 className="text-white font-bold text-base tracking-wide drop-shadow-md">{proj.title.toUpperCase()}</h3>
                    <p className={`text-[10px] font-bold tracking-widest uppercase mt-1.5 ${proj.status.includes('Tamamlandı') ? 'text-[#5ECAE6]' : 'text-[#E58C36]'}`}>
                      {proj.status}
                    </p>
                  </div>
                  <ArrowRight className="text-zinc-400 group-hover:text-white transition-colors w-4 h-4 relative z-10" />
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
