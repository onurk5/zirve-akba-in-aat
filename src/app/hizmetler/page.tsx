import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Hizmetlerimiz | Zirve Akbaş İnşaat",
  description: "Zirve Akbaş İnşaat'ın sunduğu kentsel dönüşüm, lüks konut, anahtar teslim inşaat ve mimari tasarım hizmetleri.",
};

const services = [
  {
    id: 1,
    title: "Lüks Konut & Rezidans",
    desc: "Modern yaşamın tüm ihtiyaçlarını karşılayan, estetik ve konforun birleştiği premium konut projeleri üretiyoruz. Akıllı ev sistemleri, geniş peyzaj alanları ve yüksek kaliteli malzeme seçimiyle yaşam standartlarınızı yükseltiyoruz.",
    features: ["A Sınıfı Malzeme Kalitesi", "Akıllı Ev Sistemleri", "Geniş Peyzaj ve Sosyal Alanlar"],
    image: "/project-1.jpg"
  },
  {
    id: 2,
    title: "Kentsel Dönüşüm",
    desc: "Eski ve deprem riski taşıyan yapılarınızı, güncel yönetmeliklere uygun, en yüksek statik güvenlik standartlarında yeniliyoruz. Sürecin başından sonuna kadar şeffaf iletişimle, komşularınızla birlikte güvenle oturacağınız yeni yuvalar inşa ediyoruz.",
    features: ["Deprem Yönetmeliğine Tam Uyum", "Hukuki ve Teknik Danışmanlık", "Şeffaf Süreç Yönetimi"],
    image: "/project-3.jpg"
  },
  {
    id: 3,
    title: "Anahtar Teslim İnşaat (Taahhüt)",
    desc: "Arsa aşamasından iskan (oturma izni) aşamasına kadar tüm inşaat süreçlerini tek elden yönetiyoruz. Sözleşmede belirtilen bütçe ve takvime sadık kalarak, sürpriz maliyetler çıkarmadan projeleri zamanında eksiksiz teslim ediyoruz.",
    features: ["Zamanında Teslimat Garantisi", "Bütçe ve Maliyet Kontrolü", "Uçtan Uca Proje Yönetimi"],
    image: "/feature-1.jpg"
  },
  {
    id: 4,
    title: "Mimari Tasarım & Projelendirme",
    desc: "Şehrin dokusuna değer katan, yenilikçi ve fonksiyonel mimari tasarımlarımızla geleceğin binalarını bugünden çiziyoruz. Hem dış cephe estetiğinde hem de iç mekan kullanım kolaylığında kusursuzluğu hedefliyoruz.",
    features: ["Modern ve Estetik Çizgiler", "Optimum Alan Kullanımı", "Çevreye Duyarlı Tasarım"],
    image: "/feature-2.jpg"
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* PAGE HEADER */}
      <section className="relative py-24 lg:py-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-bg-3.jpg" alt="Hizmetlerimiz" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
        </div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[2px] w-8 bg-[#E58C36]"></div>
            <span className="text-[#E58C36] font-bold tracking-[0.2em] text-sm uppercase">Faaliyet Alanlarımız</span>
            <div className="h-[2px] w-8 bg-[#E58C36]"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">Hizmetlerimiz</h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Mühendislik uzmanlığımız ve mimari vizyonumuzla, beklentilerin ötesinde yaşam ve yatırım değerleri yaratıyoruz.
          </p>
        </div>
      </section>

      {/* SERVICES CONTENT (Alternating Layout) */}
      <section className="py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 1;
            
            return (
              <div key={service.id} className={`flex flex-col gap-12 lg:gap-20 items-center ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-zinc-200/50 group">
                    <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl"></div>
                  </div>
                </div>
                
                {/* Text Side */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="space-y-4">
                    <div className="text-7xl font-black text-zinc-100 leading-none select-none -mb-10 -ml-4">
                      0{service.id}
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 relative z-10">
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-zinc-600 leading-relaxed">
                    {service.desc}
                  </p>
                  
                  <ul className="space-y-4 pt-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-zinc-800 font-medium text-lg">
                        <CheckCircle2 className="text-[#E58C36] w-6 h-6 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6">
                    <Link href="/iletisim" className="group inline-flex items-center gap-2 text-zinc-900 font-bold hover:text-[#E58C36] transition-colors uppercase tracking-widest text-sm pb-2 border-b-2 border-zinc-200 hover:border-[#E58C36]">
                      Projeniz İçin Bize Ulaşın <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
      </section>
      
      {/* BOTTOM CTA */}
      <section className="bg-[#FAFAFA] py-20 border-t border-zinc-100">
        <div className="w-full max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">Arsanızı Değerlendirmek İster Misiniz?</h2>
          <p className="text-lg text-zinc-600">
            Kentsel dönüşüm veya kat karşılığı projeleriniz için uzman ekibimizle ücretsiz keşif ve fizibilite çalışması yapalım.
          </p>
          <div className="pt-4">
            <Link href="/iletisim" className="inline-block bg-[#E58C36] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-900 transition-colors shadow-lg shadow-[#E58C36]/30 hover:shadow-xl hover:shadow-zinc-900/20">
              Bizimle İletişime Geçin
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
