import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer({ logoUrl = "/logo.png" }: { logoUrl?: string }) {
  return (
    <footer className="bg-[#FAFAFA] text-zinc-900 relative overflow-hidden border-t border-zinc-200">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-24 bg-[#E58C36]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-10 relative z-10">
        


        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block mb-2">
              <Image 
                src={logoUrl} 
                alt="Zirve Akbaş İnşaat Logo" 
                width={160} 
                height={50} 
                className="object-contain" 
              />
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium">
              Kentsel dönüşümde güvenin ve yenilikçi mimarinin adresi. Standartların ötesinde, sağlam ve estetik yaşam alanları inşa ediyoruz.
            </p>
          </div>
          
          {/* Hızlı Bağlantılar */}
          <div>
            <h4 className="font-extrabold text-zinc-900 mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E58C36]"></span>
              Kurumsal
            </h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-600">
              <li><Link href="/hakkimizda" className="hover:text-[#E58C36] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3 text-zinc-400"/> Hakkımızda</Link></li>
              <li><Link href="/haberler" className="hover:text-[#E58C36] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3 text-zinc-400"/> Haberler & Blog</Link></li>
              <li><Link href="/projeler" className="hover:text-[#E58C36] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3 text-zinc-400"/> Projelerimiz</Link></li>
              <li><Link href="/hizmetler" className="hover:text-[#E58C36] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3 text-zinc-400"/> Hizmetlerimiz</Link></li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h4 className="font-extrabold text-zinc-900 mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E58C36]"></span>
              İletişim
            </h4>
            <ul className="space-y-5 text-sm font-medium text-zinc-600">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-zinc-200 shadow-sm">
                  <Phone className="w-4 h-4 text-[#E58C36]" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-zinc-400 uppercase tracking-widest mb-1 font-bold">Müşteri Hizmetleri</span>
                  <span className="text-zinc-900 font-bold text-base leading-snug">0 (554) 747 31 90<br/>0 (545) 246 24 04<br/>0 (533) 565 69 93</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-zinc-200 shadow-sm">
                  <Mail className="w-4 h-4 text-[#E58C36]" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-zinc-400 uppercase tracking-widest mb-1 font-bold">E-Posta Adresi</span>
                  <span className="text-zinc-900 font-bold text-base">insaatzirveakbas@gmail.com</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-zinc-200 shadow-sm">
                  <MapPin className="w-4 h-4 text-[#E58C36]" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-zinc-400 uppercase tracking-widest mb-1 font-bold">Merkez Ofis</span>
                  <span className="text-zinc-900 font-bold text-base leading-snug">Safa Mahallesi, Hilmi Sokak. No:8<br/>Sancaktepe / İstanbul</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div>
            <h4 className="font-extrabold text-zinc-900 mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E58C36]"></span>
              Sosyal Medya
            </h4>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.instagram.com/zirveakbasinsaat?stkn=MWZvbm1tcWVnYXduMA==" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-zinc-200 text-zinc-500 shadow-sm hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent hover:-translate-y-1 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-zinc-200 text-zinc-500 shadow-sm hover:text-white hover:bg-[#0A66C2] hover:border-transparent hover:-translate-y-1 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-zinc-200 text-zinc-500 shadow-sm hover:text-white hover:bg-[#1877F2] hover:border-transparent hover:-translate-y-1 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest text-center md:text-left">
          <div className="max-w-[200px] md:max-w-none leading-relaxed">
            © {new Date().getFullYear()} Zirve Akbaş İnşaat. Tüm Hakları Saklıdır.
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="/kullanim-kosullari" className="hover:text-[#E58C36] transition-colors">Kullanım Koşulları</Link>
            <Link href="/gizlilik-politikasi" className="hover:text-[#E58C36] transition-colors">Gizlilik Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
