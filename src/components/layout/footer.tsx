import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#FAFAFA] border-t border-zinc-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 md:pt-20 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="inline-block mb-2">
              <Image src="/logo.png" alt="Zirve Akbaş İnşaat Logo" width={160} height={50} className="object-contain" />
            </Link>
            <p className="text-base font-medium text-zinc-600 leading-relaxed">
              Kentsel dönüşümde güvenin ve yenilikçi mimarinin adresi. Modern yaşam alanları inşa ediyoruz.
            </p>
          </div>
          <div>
            <h4 className="font-extrabold text-zinc-900 mb-6 uppercase tracking-widest text-sm">Hızlı Bağlantılar</h4>
            <ul className="space-y-4 text-base font-bold text-zinc-500">
              <li><Link href="/projeler" className="hover:text-[#E58C36] transition-colors">Projeler</Link></li>
              <li><Link href="/hizmetler" className="hover:text-[#E58C36] transition-colors">Hizmetler</Link></li>
              <li><Link href="/hakkimizda" className="hover:text-[#E58C36] transition-colors">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="hover:text-[#E58C36] transition-colors">İletişim</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-zinc-900 mb-6 uppercase tracking-widest text-sm">İletişim</h4>
            <ul className="space-y-4 text-base font-bold text-zinc-500">
              <li>0 (212) 555 00 00</li>
              <li>bilgi@zirveakbas.com.tr</li>
              <li>Kadıköy, İstanbul</li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-zinc-900 mb-6 uppercase tracking-widest text-sm">Sosyal Medya</h4>
            <ul className="flex items-center gap-4">
              <li>
                <a href="https://www.instagram.com/zirveakbasinsaat?stkn=MWZvbm1tcWVnYXduMA==" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white hover:scale-110 transition-all shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0A66C2] text-white hover:scale-110 transition-all shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2] text-white hover:scale-110 transition-all shadow-md">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-zinc-200 text-center text-sm font-bold text-zinc-400">
          © {new Date().getFullYear()} Zirve Akbaş İnşaat ve Kentsel Dönüşüm. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
