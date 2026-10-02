"use client";

import { useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Building2, HardHat, ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturesSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const features = [
    {
      title: "Güvenli Yapılar",
      desc: "En son deprem yönetmeliklerine uygun, statik açıdan kusursuz, güvenle oturabileceğiniz sağlam projeler üretiyoruz.",
      icon: ShieldCheck,
      image: "/feature-1.jpg"
    },
    {
      title: "Modern Mimari",
      desc: "Şehrin dokusuna uyumlu, çağdaş yaşam standartlarını karşılayan estetik ve fonksiyonel yaşam alanları tasarlıyoruz.",
      icon: Building2,
      image: "/feature-2.jpg"
    },
    {
      title: "Zamanında Teslim",
      desc: "Proje başlangıcından itibaren şeffaf bir süreç yönetimiyle, söz verdiğimiz tarihte anahtar teslim yapıyoruz.",
      icon: HardHat,
      image: "/feature-3.jpg"
    }
  ];

  return (
    <div className="w-full relative">
      {/* Mobile: Horizontal scroll (Slider), Desktop: Grid */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 md:gap-8 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden" 
        style={{ scrollbarWidth: 'none' }}
      >
        {features.map((item, idx) => (
          <div key={idx} className="w-[85vw] sm:w-[60vw] md:w-auto shrink-0 snap-center group relative rounded-2xl overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-zinc-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col cursor-default">
            
            <div className="relative h-72 overflow-hidden">
              <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-900/90"></div>
              
              {/* Icon and Title positioned over the image */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end gap-4">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 text-white shadow-xl shrink-0 group-hover:bg-[#E58C36] group-hover:border-[#E58C36] transition-colors duration-500">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              </div>
            </div>
            
            <div className="p-8 flex-1 bg-white">
              <p className="text-zinc-600 leading-relaxed text-base">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Scroll Arrows */}
      <div className="flex justify-end gap-3 md:hidden mt-2">
        <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-colors shadow-sm active:scale-95">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-colors shadow-sm active:scale-95">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
