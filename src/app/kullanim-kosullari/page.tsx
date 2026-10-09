import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | Zirve Akbaş İnşaat",
  description: "Zirve Akbaş İnşaat web sitesi kullanım koşulları ve hizmet şartları.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
            Kullanım Koşulları
          </h1>
          <p className="text-zinc-500 font-medium">Son güncellenme tarihi: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-zinc-100 border border-zinc-100 prose prose-zinc max-w-none">
          <h3>1. Taraflar ve Kapsam</h3>
          <p>
            Bu web sitesi <strong>Zirve Akbaş İnşaat ve Kentsel Dönüşüm</strong> tarafından işletilmektedir. Siteyi ziyaret ederek veya hizmetlerimizden faydalanarak bu kullanım koşullarını kabul etmiş sayılırsınız. 
          </p>

          <h3>2. Fikri Mülkiyet Hakları</h3>
          <p>
            Bu sitede yer alan tüm metinler, görseller, logolar, projeler ve tasarımlar Zirve Akbaş İnşaat'a aittir veya lisanslı olarak kullanılmaktadır. Önceden yazılı izin alınmaksızın kopyalanamaz, çoğaltılamaz ve ticari amaçla kullanılamaz.
          </p>

          <h3>3. Sorumluluk Sınırları</h3>
          <p>
            Web sitemizde yer alan içerikler, kentsel dönüşüm, mimari projeler ve hizmetlerimiz hakkında genel bilgi vermek amacıyla hazırlanmıştır. Sitedeki bilgilerin doğruluğu ve güncelliği için azami çaba gösterilmekle birlikte, doğabilecek her türlü doğrudan veya dolaylı zarardan şirketimiz sorumlu tutulamaz.
          </p>

          <h3>4. Bağlantılar (Linkler)</h3>
          <p>
            Zirve Akbaş İnşaat web sitesinden üçüncü taraf web sitelerine verilen bağlantılar (linkler) tamamen kullanıcıya kolaylık sağlamak içindir. Bu sitelerin içeriklerinden firmamız sorumlu değildir.
          </p>

          <h3>5. Hizmet ve Şartlarda Değişiklik</h3>
          <p>
            Şirketimiz, sitede yer alan herhangi bir içeriği, projeyi, kampanya veya hizmet şartlarını önceden bildirmeksizin değiştirme, geçici veya kalıcı olarak durdurma hakkını saklı tutar.
          </p>

          <h3>6. Uyuşmazlıkların Çözümü</h3>
          <p>
            Bu Kullanım Koşullarının uygulanmasından veya yorumlanmasından doğacak her türlü ihtilafta Türkiye Cumhuriyeti yasaları geçerli olup, İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>
          
          <hr className="my-8 border-zinc-100" />
          
          <p className="text-sm text-zinc-500 font-medium">
            Sorularınız ve talepleriniz için <strong>insaatzirveakbas@gmail.com</strong> adresinden bizimle iletişime geçebilirsiniz.
          </p>
        </div>

      </div>
    </main>
  );
}
