import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata = {
  title: "Projelerimiz | Zirve Akbaş İnşaat",
  description: "Zirve Akbaş İnşaat tarafından hayata geçirilen lüks konut, rezidans ve kentsel dönüşüm projeleri.",
};

const projects = [
  { id: 1, title: "Sunset Vadi Villaları", loc: "Zekeriyaköy, İstanbul", img: "/project-1.jpg", type: "Lüks Konut", status: "Tamamlandı" },
  { id: 2, title: "Aethelgard Rezidans", loc: "Ataşehir, İstanbul", img: "/project-2.jpg", type: "Rezidans", status: "Tamamlandı" },
  { id: 3, title: "Skyline Teras", loc: "Kadıköy, İstanbul", img: "/project-3.jpg", type: "Kentsel Dönüşüm", status: "Devam Ediyor" },
  { id: 4, title: "Ormanada Konakları", loc: "Beykoz, İstanbul", img: "/project-1.jpg", type: "Lüks Konut", status: "Tamamlandı" },
  { id: 5, title: "Marina Premium", loc: "Pendik, İstanbul", img: "/project-2.jpg", type: "Rezidans", status: "Devam Ediyor" },
  { id: 6, title: "Moda Palas", loc: "Kadıköy, İstanbul", img: "/project-3.jpg", type: "Kentsel Dönüşüm", status: "Tamamlandı" },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-24">
      {/* PAGE HEADER */}
      <section className="relative py-24 lg:py-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-bg-2.jpg" alt="Projelerimiz" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
        </div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[2px] w-8 bg-[#E58C36]"></div>
            <span className="text-[#E58C36] font-bold tracking-[0.2em] text-sm uppercase">Portfolyo</span>
            <div className="h-[2px] w-8 bg-[#E58C36]"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">Projelerimiz</h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Çeyrek asırlık tecrübemizle hayata geçirdiğimiz, şehre değer katan yenilikçi ve estetik yaşam alanları.
          </p>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {projects.map((p) => (
              <div key={p.id} className="group flex flex-col gap-6 cursor-pointer">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl shadow-zinc-200/50">
                  <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 right-6">
                    <span className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-xl backdrop-blur-md transition-transform group-hover:scale-105 ${p.status === 'Devam Ediyor' ? 'bg-[#E58C36]/90 text-white' : 'bg-white/90 text-zinc-900'}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#E58C36] font-bold text-sm uppercase tracking-widest">{p.type}</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 mb-4 group-hover:text-[#E58C36] transition-colors">{p.title}</h2>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <MapPin className="w-5 h-5 text-zinc-400" />
                    <span className="text-lg font-medium">{p.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
