import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Target, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Hakkımızda | Zirve Akbaş İnşaat",
  description: "Zirve Akbaş İnşaat olarak 12 yıllık tecrübemizle estetik ve sağlamlığın mükemmel uyumunu yakalıyoruz.",
};

export default function HakkimizdaPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image src="/about-image-v2.jpg" alt="Kurumsal" fill className="object-cover" priority quality={90} />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
        </div>
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-[#E58C36]"></span>
            <span className="text-[#E58C36] font-bold tracking-[0.3em] text-sm uppercase">Hakkımızda</span>
            <span className="h-[2px] w-8 bg-[#E58C36]"></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8">
            Geleceği <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E58C36] to-[#fbc899] font-serif italic pr-2">Güvenle</span> <br/>İnşa Ediyoruz
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            12 yılı aşkın deneyimimizle inşaat sektöründe yenilikçi, estetik ve depreme dayanıklı projeler hayata geçiriyoruz.
          </p>
        </div>
      </section>

      {/* STORY & MISSION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-8 relative">
              <div className="absolute -top-10 -left-10 text-[12rem] font-black text-zinc-900/[0.03] -z-10 leading-none select-none">
                VİZYON
              </div>
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-[#E58C36]"></div>
                <span className="text-[#E58C36] font-bold tracking-[0.2em] text-sm uppercase">Hikayemiz</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 leading-[1.2]">
                Sektörde İz Bırakan <br /> Bir Anlayış
              </h2>
              <div className="space-y-6 text-zinc-600 text-lg leading-relaxed">
                <p>
                  Zirve Akbaş İnşaat, kurulduğu ilk günden itibaren <strong>"önce insan, sonra yapı"</strong> felsefesini benimseyerek, bulunduğu her bölgeye değer katan projeler geliştirmeyi amaç edinmiştir.
                </p>
                <p>
                  Sadece beton ve demirden ibaret olmayan, içinde huzurla yaşanacak sıcak yuvalar ve verimli çalışma alanları tasarlıyoruz. Her projemizde teknolojik gelişmeleri yakından takip ediyor, doğaya saygılı ve sürdürülebilir mimari çizgiler kullanıyoruz.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-zinc-100">
                <div>
                  <h4 className="text-4xl font-black text-[#E58C36] mb-2">12+</h4>
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">Yıllık Tecrübe</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-[#E58C36] mb-2">50+</h4>
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">Tamamlanan Proje</p>
                </div>
              </div>
            </div>

            {/* Right Images */}
            <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
              <div className="relative aspect-[4/5] w-[80%] ml-auto rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/project-1.jpg" alt="Zirve Akbaş Mimari" fill className="object-cover" />
              </div>
              <div className="absolute bottom-10 left-0 w-[55%] aspect-square rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <Image src="/project-2.jpg" alt="Zirve Akbaş Proje" fill className="object-cover" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="flex justify-center items-center gap-4">
              <div className="h-[2px] w-12 bg-[#E58C36]"></div>
              <span className="text-[#E58C36] font-bold tracking-[0.2em] text-sm uppercase">Değerlerimiz</span>
              <div className="h-[2px] w-12 bg-[#E58C36]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">Bizi Biz Yapan İlkelerimiz</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Şeffaflık", desc: "Projelerimizin her aşamasında paydaşlarımıza karşı dürüst, açık ve hesap verebilir bir tutum sergiliyoruz.", icon: CheckCircle2 },
              { title: "Sürdürülebilirlik", desc: "Çevreye duyarlı yapı malzemeleri seçiyor, gelecek nesillere yaşanabilir şehirler bırakmayı hedefliyoruz.", icon: Target },
              { title: "İnsan Odaklılık", desc: "Müşterilerimizin, çalışanlarımızın ve toplumun beklentilerini her zaman ön planda tutarak hareket ediyoruz.", icon: Users },
            ].map((v, idx) => (
              <div key={idx} className="bg-white p-10 rounded-2xl border border-zinc-100 hover:border-[#E58C36]/30 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all group">
                <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E58C36]/10 transition-colors">
                  <v.icon className="w-8 h-8 text-zinc-400 group-hover:text-[#E58C36] transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">{v.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/cta-bg-v2.jpg" alt="İletişim" fill className="object-cover" />
          <div className="absolute inset-0 bg-zinc-950/80"></div>
        </div>
        <div className="max-w-3xl mx-auto px-4 space-y-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Projelerimizi Hayata Geçirmek İçin Sabırsızlanıyoruz.</h2>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/iletisim" className="group inline-flex items-center justify-center gap-3 bg-[#E58C36] text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-zinc-900 transition-all duration-300 shadow-xl shadow-[#E58C36]/20 text-sm tracking-widest uppercase">
              BİZİMLE İLETİŞİME GEÇİN
              <span className="bg-black/10 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
