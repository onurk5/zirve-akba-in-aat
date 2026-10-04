import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Calendar, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await db.project.findUnique({
    where: { slug }
  });

  if (!project) return { title: "Proje Bulunamadı" };

  return {
    title: project.seoTitle || `${project.title} | Zirve Akbaş İnşaat`,
    description: project.seoDesc || project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const project = await db.project.findUnique({
    where: { slug }
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-24 pb-0 md:pb-12">
      {/* Premium Hero Section */}
      <section className="relative h-[65vh] lg:h-[75vh] w-full max-w-[96%] mx-auto mt-4 rounded-3xl overflow-hidden shadow-2xl">
        <Image src={project.afterImage} alt={project.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 to-transparent"></div>
        
        <div className="absolute top-8 left-8 z-20">
          <Link href="/projeler" className="inline-flex items-center gap-2 text-white hover:text-[#E58C36] font-bold bg-white/10 px-5 py-3 rounded-full backdrop-blur-md transition-all hover:bg-white/20 border border-white/10 text-sm tracking-widest uppercase">
            <ArrowLeft className="w-4 h-4" />
            Tüm Projelere Dön
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-16 z-10 flex flex-col lg:flex-row justify-between items-end gap-6 md:gap-8">
          <div className="max-w-3xl w-full">
            <div className="mb-4 md:mb-6 flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4">
              <span className={`px-3 py-1.5 md:px-5 md:py-2.5 rounded-full text-[10px] md:text-xs font-extrabold uppercase tracking-widest shadow-xl backdrop-blur-md whitespace-nowrap ${project.status === 'Devam Ediyor' ? 'bg-[#E58C36] text-white' : 'bg-white text-zinc-900'}`}>
                {project.status}
              </span>
              <span className="text-[#E58C36] font-bold tracking-widest uppercase text-xs md:text-sm whitespace-nowrap">Kentsel Dönüşüm</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-4 tracking-tight leading-tight w-full">
              {project.title}
            </h1>
            <p className="text-sm md:text-xl text-zinc-300 font-medium max-w-2xl leading-snug md:leading-relaxed">
              {project.seoDesc || "Modern mimari çizgiler ve en üst düzey güvenlik standartlarıyla inşa edilmiş benzersiz bir yaşam alanı."}
            </p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="pt-12 pb-4 md:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12 md:space-y-16">
              
              {/* Description */}
              <div className="bg-white p-6 md:p-12 rounded-3xl shadow-xl shadow-zinc-100 border border-zinc-100">
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="w-8 md:w-12 h-[2px] bg-[#E58C36]"></div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900">Proje Hikayesi</h2>
                </div>
                <div className="prose prose-base md:prose-lg prose-zinc text-zinc-600 leading-relaxed whitespace-pre-line font-medium">
                  {project.description}
                </div>
                
                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 md:mt-12 pt-10 md:pt-12 border-t border-zinc-100">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#E58C36] shrink-0" />
                    <div>
                      <h4 className="font-bold text-zinc-900 mb-1">Deprem Güvenliği</h4>
                      <p className="text-sm text-zinc-500">En güncel yönetmeliklere uygun statik tasarım ve C35 üstü beton kullanımı.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#E58C36] shrink-0" />
                    <div>
                      <h4 className="font-bold text-zinc-900 mb-1">Premium Malzeme</h4>
                      <p className="text-sm text-zinc-500">İç ve dış mimaride 1. sınıf garantili ürünler ve kusursuz işçilik.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Before / After Section */}
              {project.beforeImage && (
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-8 md:w-12 h-[2px] bg-[#E58C36]"></div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900">Dönüşüm Süreci</h3>
                  </div>
                  <p className="text-zinc-500 text-base md:text-lg font-medium">Eski ve güvensiz yapıyı, modern ve güvenilir bir yaşam alanına dönüştürdük. İncelemek için çizgiyi sağa veya sola sürükleyin.</p>
                  
                  {/* Interactive Slider */}
                  <BeforeAfterSlider 
                    beforeImage={project.beforeImage} 
                    afterImage={project.afterImage} 
                  />
                </div>
              )}
            </div>
            
            {/* Sidebar Sticky Panel */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32 space-y-8">
                
                {/* Künye */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-zinc-100 border border-zinc-100">
                  <h3 className="text-sm font-black text-zinc-900 mb-8 uppercase tracking-widest border-b border-zinc-100 pb-4">Proje Detayları</h3>
                  
                  <ul className="space-y-8">
                    <li className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                        <MapPin className="w-5 h-5 text-[#E58C36]" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400 mb-1 font-bold uppercase tracking-widest">Lokasyon</p>
                        <p className="font-bold text-zinc-900 text-lg leading-tight">{project.location}</p>
                      </div>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                        <Calendar className="w-5 h-5 text-[#E58C36]" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400 mb-1 font-bold uppercase tracking-widest">Teslim Yılı</p>
                        <p className="font-bold text-zinc-900 text-lg">{new Date(project.createdAt).getFullYear()}</p>
                      </div>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-[#E58C36]/10 flex items-center justify-center shrink-0 border border-[#E58C36]/20">
                        <CheckCircle2 className="w-5 h-5 text-[#E58C36]" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400 mb-1 font-bold uppercase tracking-widest">Durum</p>
                        <p className="font-bold text-[#E58C36] text-lg">{project.status}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* CTA */}
                <div className="p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                  <Image src={project.afterImage} alt="Proje İletişim" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-sm"></div>
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E58C36]/30 blur-3xl rounded-full pointer-events-none z-10"></div>
                  
                  <div className="relative z-20">
                    <h4 className="font-black text-white text-2xl mb-4">Sizin de benzer bir projeniz mi var?</h4>
                    <p className="text-zinc-300 text-sm mb-8">Kentsel dönüşüm sürecinizde size özel çözümler sunalım.</p>
                    <Link href="/iletisim" className="flex items-center justify-center w-full bg-[#E58C36] text-white text-center px-6 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-colors shadow-lg shadow-[#E58C36]/20">
                      Bize Ulaşın
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
