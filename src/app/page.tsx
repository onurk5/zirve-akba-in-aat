import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Building2, HardHat, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, Star, MapPin, Quote } from "lucide-react";
import { HeroSlider } from "@/components/ui/hero-slider";
import { FeaturesSlider } from "@/components/ui/features-slider";
import { ScrollArrows } from "@/components/ui/scroll-arrows";
import { WorkProcessBackground } from "@/components/ui/work-process-background";

export default async function Home() {
  const projects = await db.project.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  return (
    <>
      {/* Interactive Hero Banner Slider */}
      <HeroSlider projects={projects} />

      {/* ABOUT SECTION - Premium Redesign */}
      <section className="py-24 lg:py-32 bg-[#FAFAFA] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-10 relative">
              {/* Massive background number */}
              <div className="absolute -top-12 -left-8 text-[14rem] font-black text-zinc-900/[0.03] -z-10 leading-none select-none tracking-tighter">
                12
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="h-[2px] w-12 bg-[#E58C36]"></div>
                  <span className="text-[#E58C36] font-bold tracking-[0.2em] text-sm uppercase">Hakkımızda</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 leading-[1.1] tracking-tight">
                  Sadece Bina Değil, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E58C36] to-orange-400">
                    Gelecek
                  </span> İnşa Ediyoruz.
                </h2>

                <p className="text-lg text-zinc-600 leading-relaxed max-w-xl">
                  Zirve Akbaş İnşaat olarak 12 yıllık tecrübemizle, estetik ve sağlamlığın mükemmel uyumunu yakalıyoruz. Her projemizde kalite standartlarını yeniden belirliyor, güvenle yaşanacak modern alanlar tasarlıyoruz.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <div className="text-4xl font-bold text-zinc-900 mb-2">150<span className="text-[#E58C36]">+</span></div>
                  <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Tamamlanan Proje</div>
                  <div className="h-1 w-12 bg-zinc-200 mt-4 rounded-full"></div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-zinc-900 mb-2">%100</div>
                  <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Müşteri Memnuniyeti</div>
                  <div className="h-1 w-12 bg-zinc-200 mt-4 rounded-full"></div>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/hakkimizda" className="group inline-flex items-center justify-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full font-medium hover:bg-[#E58C36] transition-all duration-300 shadow-xl shadow-zinc-900/20 hover:shadow-[#E58C36]/20">
                  Hakkımızda
                  <span className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Images (Overlapping Layout) */}
            <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[650px]">
              {/* Main Image */}
              <div className="absolute top-0 right-0 w-[85%] h-[85%] rounded-3xl overflow-hidden shadow-2xl z-10 group">
                <Image src="/about-image-v2.jpg" alt="Zirve Akbaş Ana Proje" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl"></div>
              </div>

              {/* Secondary Image */}
              <div className="absolute bottom-0 left-0 w-[55%] h-[50%] rounded-3xl overflow-hidden shadow-2xl z-20 border-8 border-[#FAFAFA] group">
                <Image src="/feature-1.jpg" alt="İnşaat Detay" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/4 -left-8 w-32 h-32 bg-[#E58C36]/20 rounded-full blur-3xl z-0"></div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 border-[1px] border-[#E58C36]/30 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-48 h-48 border-[1px] border-[#E58C36]/10 rounded-full -z-10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* PROJECTS SHOWCASE */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-[#E58C36]"></div>
                <span className="text-[#E58C36] font-bold tracking-[0.2em] text-sm uppercase">Projelerimiz</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900">Öne Çıkan Başarılar</h2>
            </div>
          </div>

          <div id="projects-slider" className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 md:gap-8 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
            {[
              { title: "Sunset Vadi Villaları", loc: "Zekeriyaköy, İstanbul", img: "/project-1.jpg", type: "Lüks Konut" },
              { title: "Aethelgard Rezidans", loc: "Ataşehir, İstanbul", img: "/project-2.jpg", type: "Rezidans" },
              { title: "Skyline Teras", loc: "Kadıköy, İstanbul", img: "/project-3.jpg", type: "Kentsel Dönüşüm" }
            ].map((p, idx) => (
              <div key={idx} className="w-[85vw] sm:w-[60vw] md:w-auto shrink-0 snap-center group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer">
                <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-[#E58C36] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full w-fit mb-4 shadow-lg shadow-[#E58C36]/30">
                    {p.type}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{p.title}</h3>
                  <div className="flex items-center gap-2 text-zinc-300 text-sm">
                    <MapPin className="w-4 h-4" /> {p.loc}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <ScrollArrows targetId="projects-slider" />
          
          <div className="mt-12 flex justify-center">
            <Link href="/projeler" className="group inline-flex items-center justify-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full font-medium hover:bg-[#E58C36] transition-all duration-300 shadow-xl shadow-zinc-900/20 hover:shadow-[#E58C36]/20 text-sm tracking-widest uppercase">
              Tüm Projeleri Gör
              <span className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>



      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-4">
            <div className="flex justify-center items-center gap-4">
              <div className="h-[2px] w-12 bg-[#E58C36]"></div>
              <span className="text-[#E58C36] font-bold tracking-[0.2em] text-sm uppercase">Müşteri Yorumları</span>
              <div className="h-[2px] w-12 bg-[#E58C36]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900">Güven İnşa Ediyoruz</h2>
          </div>

          <div id="testimonials-slider" className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 md:gap-8 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
            {[
              {
                text: "Kentsel dönüşüm sürecimizde firmayla çalışmak hayatımızın en doğru kararıydı. Söz verdikleri tarihten bile önce, kusursuz bir işçilikle evimizi teslim ettiler.",
                name: "Ahmet Yılmaz",
                role: "Arsa Sahibi",
                rating: 5
              },
              {
                text: "Kullanılan malzemelerin kalitesi ve detaylara gösterilen özen gerçekten muazzam. Ailemle birlikte güven içinde ve çok şık bir evde oturmanın mutluluğunu yaşıyoruz.",
                name: "Elif Demir",
                role: "Daire Sahibi",
                rating: 5
              },
              {
                text: "Projenin başından sonuna kadar gösterdikleri şeffaflık ve profesyonel yaklaşım, inşaat sektörüne olan tüm önyargılarımı yıktı. Kesinlikle tavsiye ediyorum.",
                name: "Mustafa Kaya",
                role: "Yatırımcı",
                rating: 5
              }
            ].map((t, idx) => (
              <div key={idx} className="w-[85vw] sm:w-[60vw] md:w-auto shrink-0 snap-center bg-[#FAFAFA] p-8 md:p-10 rounded-2xl border border-zinc-100 relative group hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-zinc-200 group-hover:text-[#E58C36]/20 transition-colors" />
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#E58C36] text-[#E58C36]" />
                  ))}
                </div>
                <p className="text-zinc-600 leading-relaxed mb-8 italic">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-zinc-900">{t.name}</h4>
                  <p className="text-sm text-zinc-500 font-medium">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <ScrollArrows targetId="testimonials-slider" />
        </div>
      </section>

      {/* WORK PROCESS SECTION - Neon Dark Theme */}
      <section className="relative py-24 bg-zinc-950 overflow-hidden border-t border-zinc-900">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes travelDot {
            0% { left: 0%; opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
          .animate-travel {
            animation: travelDot 8s infinite linear;
          }

          /* Card Border Glow Animations */
          @keyframes cardBorderGlow1 {
            0%, 5%, 20%, 100% { border-color: #27272a; box-shadow: none; }
            12.5% { border-color: rgba(229, 140, 54, 0.5); box-shadow: 0 10px 40px -10px rgba(229,140,54,0.2); }
          }
          @keyframes cardBorderGlow2 {
            0%, 30%, 45%, 100% { border-color: #27272a; box-shadow: none; }
            37.5% { border-color: rgba(229, 140, 54, 0.5); box-shadow: 0 10px 40px -10px rgba(229,140,54,0.2); }
          }
          @keyframes cardBorderGlow3 {
            0%, 55%, 70%, 100% { border-color: #27272a; box-shadow: none; }
            62.5% { border-color: rgba(229, 140, 54, 0.5); box-shadow: 0 10px 40px -10px rgba(229,140,54,0.2); }
          }
          @keyframes cardBorderGlow4 {
            0%, 80%, 95%, 100% { border-color: #27272a; box-shadow: none; }
            87.5% { border-color: rgba(229, 140, 54, 0.5); box-shadow: 0 10px 40px -10px rgba(229,140,54,0.2); }
          }

          /* Circle Node Glow Animations */
          @keyframes circleGlow1 {
            0%, 5%, 20%, 100% { border-color: #27272a; background-color: #18181b; box-shadow: none; }
            12.5% { border-color: #E58C36; background-color: rgba(229,140,54,0.15); box-shadow: 0 0 20px rgba(229,140,54,0.5); }
          }
          @keyframes circleGlow2 {
            0%, 30%, 45%, 100% { border-color: #27272a; background-color: #18181b; box-shadow: none; }
            37.5% { border-color: #E58C36; background-color: rgba(229,140,54,0.15); box-shadow: 0 0 20px rgba(229,140,54,0.5); }
          }
          @keyframes circleGlow3 {
            0%, 55%, 70%, 100% { border-color: #27272a; background-color: #18181b; box-shadow: none; }
            62.5% { border-color: #E58C36; background-color: rgba(229,140,54,0.15); box-shadow: 0 0 20px rgba(229,140,54,0.5); }
          }
          @keyframes circleGlow4 {
            0%, 80%, 95%, 100% { border-color: #27272a; background-color: #18181b; box-shadow: none; }
            87.5% { border-color: #E58C36; background-color: rgba(229,140,54,0.15); box-shadow: 0 0 20px rgba(229,140,54,0.5); }
          }

          /* Icon Color Animations */
          @keyframes iconGlow1 {
            0%, 5%, 20%, 100% { color: #52525b; transform: scale(1); }
            12.5% { color: #E58C36; transform: scale(1.15); }
          }
          @keyframes iconGlow2 {
            0%, 30%, 45%, 100% { color: #52525b; transform: scale(1); }
            37.5% { color: #E58C36; transform: scale(1.15); }
          }
          @keyframes iconGlow3 {
            0%, 55%, 70%, 100% { color: #52525b; transform: scale(1); }
            62.5% { color: #E58C36; transform: scale(1.15); }
          }
          @keyframes iconGlow4 {
            0%, 80%, 95%, 100% { color: #52525b; transform: scale(1); }
            87.5% { color: #E58C36; transform: scale(1.15); }
          }
        `}} />

        <WorkProcessBackground />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#E58C36]"></span>
              <span className="text-[#E58C36] font-bold tracking-[0.3em] text-sm uppercase">Çalışma Sürecimiz</span>
              <span className="h-[2px] w-8 bg-[#E58C36]"></span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase">
              Fikirden Anahtara <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E58C36] to-[#fbc899] font-medium italic normal-case tracking-normal">
                Kusursuz Adımlar
              </span>
            </h2>
          </div>

          <div className="relative mt-16 lg:mt-32 h-auto lg:h-[480px]">
            {/* The Neon Track (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-zinc-800 -translate-y-1/2 rounded-full overflow-visible z-0">
              {/* Traveling Neon Dot */}
              <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#E58C36] rounded-full shadow-[0_0_25px_6px_rgba(229,140,54,0.9)] animate-travel z-20"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 h-full">
              {[
                {
                  num: "01",
                  title: "Tasarım & Vizyon",
                  desc: "Mimar ve şehir plancılarımızla konumun potansiyelini analiz eder, projenin karakterini belirleriz.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  ),
                  color: "from-blue-500/20 to-zinc-900 border-blue-500/30",
                  textAccent: "text-blue-400 group-hover:text-blue-300"
                },
                {
                  num: "02",
                  title: "Planlama & Ruhsat",
                  desc: "Statik, mekanik ve peyzaj projelerini eş zamanlı yürütür, tüm yasal izinleri hızla tamamlarız.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  ),
                  color: "from-purple-500/20 to-zinc-900 border-purple-500/30",
                  textAccent: "text-purple-400 group-hover:text-purple-300"
                },
                {
                  num: "03",
                  title: "İnşaat & Kontrol",
                  desc: "En üst segment malzemelerle başlar, her santimetreyi bağımsız denetimlerden geçirerek inşa ederiz.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  ),
                  color: "from-[#E58C36]/20 to-zinc-900 border-[#E58C36]/30",
                  textAccent: "text-[#E58C36] group-hover:text-orange-300"
                },
                {
                  num: "04",
                  title: "Teslim & Yaşam",
                  desc: "Söz verdiğimiz tarihte anahtarı teslim eder, 5 yıllık yapısal garantiyle daima yanınızda oluruz.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  ),
                  color: "from-emerald-500/20 to-zinc-900 border-emerald-500/30",
                  textAccent: "text-emerald-400 group-hover:text-emerald-300"
                }
              ].map((step, idx) => {
                const isBottom = idx % 2 === 0; // 1st and 3rd steps sit BELOW the line
                
                return (
                <div key={idx} className="relative h-full flex flex-col justify-center lg:block">
                  
                  {/* The Node on the Track (Desktop) */}
                  <div 
                    className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-800 items-center justify-center z-10 transition-colors duration-500"
                    style={{ animation: `circleGlow${idx+1} 8s infinite linear` }}
                  >
                    <div 
                      className="text-zinc-500 transition-all duration-500"
                      style={{ animation: `iconGlow${idx+1} 8s infinite linear` }}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* The Node (Mobile) */}
                  <div className="lg:hidden mx-auto w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center z-10 mb-6">
                    <div className={step.textAccent}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Vertical Connection Line (Desktop) */}
                  <div className={`hidden lg:block absolute left-1/2 w-[1px] bg-zinc-800 ${isBottom ? 'top-1/2 h-12' : 'bottom-1/2 h-12'} -translate-x-1/2 z-0`}></div>

                  {/* Card Content */}
                  <div 
                    className={`relative lg:absolute left-0 right-0 ${isBottom ? 'lg:top-[calc(50%+3rem)]' : 'lg:bottom-[calc(50%+3rem)]'} bg-gradient-to-br ${step.color} backdrop-blur-xl rounded-2xl p-8 border border-zinc-800 overflow-hidden group hover:scale-[1.02] transition-all duration-300`}
                  >
                    {/* Background Number */}
                    <div className={`absolute ${isBottom ? '-bottom-6 -right-4' : '-top-6 -right-4'} text-[100px] leading-none font-black text-white/[0.04] select-none pointer-events-none group-hover:text-white/[0.08] transition-colors duration-500`}>
                      {step.num}
                    </div>

                    <h3 className={`text-xl font-bold mb-4 relative z-10 ${step.textAccent} transition-colors`}>{step.title}</h3>
                    <p className="text-zinc-300 text-sm leading-relaxed relative z-10 font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>
      </section>



      {/* SERVICES / FEATURES SECTION */}
      <section className="py-24 bg-zinc-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-[#E58C36]"></div>
                <span className="text-[#E58C36] font-semibold tracking-widest text-sm uppercase">Neden Biz?</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-tight">
                Standartların Ötesinde, <br /> Kusursuz Hizmet.
              </h2>
            </div>
          </div>

          <FeaturesSlider />
          
          <div className="mt-12 flex justify-center">
            <Link href="/hizmetler" className="group inline-flex items-center justify-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full font-medium hover:bg-[#E58C36] transition-all duration-300 shadow-xl shadow-zinc-900/20 hover:shadow-[#E58C36]/20 text-sm tracking-widest uppercase">
              Tüm Hizmetlerimiz
              <span className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <Image src="/cta-bg-v2.jpg" alt="Modern Architecture" fill className="object-cover" />
        </div>
        <div className="w-full max-w-4xl mx-auto px-4 relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Hayalinizdeki Projeyi <br /> <span className="text-[#E58C36]">Birlikte İnşa Edelim.</span>
          </h2>
          <p className="text-lg text-zinc-300">
            Kentsel dönüşüm, arsa karşılığı inşaat veya özel taahhüt projeleriniz için uzman ekibimizle tanışın. Size özel çözümler sunmak için buradayız.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/iletisim" className="group inline-flex items-center justify-center gap-3 bg-[#E58C36] text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-zinc-900 transition-all duration-300 shadow-xl shadow-[#E58C36]/20 text-sm tracking-widest uppercase">
              BİZİMLE İLETİŞİME GEÇİN
              <span className="bg-black/10 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/projeler" className="group inline-flex items-center justify-center gap-3 bg-transparent text-white border border-zinc-600 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all duration-300 text-sm tracking-widest uppercase">
              PROJELERİ İNCELEYİN
              <span className="bg-white/10 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
