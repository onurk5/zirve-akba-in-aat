import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Zirve Akbaş İnşaat",
  description: "Zirve Akbaş İnşaat web sitesi kişisel verilerin korunması ve gizlilik politikası.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
            Gizlilik Politikası ve KVKK
          </h1>
          <p className="text-zinc-500 font-medium">Son güncellenme tarihi: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-zinc-100 border border-zinc-100 prose prose-zinc max-w-none">
          <h3>1. Genel Bakış</h3>
          <p>
            <strong>Zirve Akbaş İnşaat</strong> olarak, müşterilerimizin ve web sitemizi ziyaret eden kullanıcıların gizliliğine ve kişisel verilerinin güvenliğine büyük önem veriyoruz. Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca verilerinizi nasıl topladığımızı ve kullandığımızı açıklar.
          </p>

          <h3>2. Toplanan Veriler</h3>
          <p>
            Bizimle iletişim formu, e-bülten veya e-posta yoluyla iletişime geçtiğinizde adınız, soyadınız, telefon numaranız, e-posta adresiniz ve ilettiğiniz mesaj içerikleriniz gibi veriler toplanmaktadır.
          </p>

          <h3>3. Verilerin Kullanım Amacı</h3>
          <p>
            Toplanan kişisel verileriniz aşağıdaki amaçlarla kullanılmaktadır:
          </p>
          <ul>
            <li>Size projelerimiz ve kentsel dönüşüm hizmetlerimiz hakkında bilgi vermek,</li>
            <li>Taleplerinizi değerlendirmek ve sorularınızı yanıtlamak,</li>
            <li>Onay vermeniz halinde kampanyalarımızdan, yeni projelerimizden ve bültenlerden sizi haberdar etmek.</li>
          </ul>

          <h3>4. Çerez (Cookie) Kullanımı</h3>
          <p>
            Web sitemizin performansını artırmak, kullanıcı deneyimini analiz etmek ve daha iyi hizmet sunabilmek amacıyla standart çerezler kullanılmaktadır. Çerez ayarlarınızı tarayıcınız üzerinden dilediğiniz zaman değiştirebilirsiniz.
          </p>

          <h3>5. Verilerin Paylaşılması</h3>
          <p>
            Zirve Akbaş İnşaat, kişisel verilerinizi kesinlikle yasal zorunluluklar dışında üçüncü kişi veya ticari kuruluşlarla satmaz, kiralayamaz veya paylaşmaz. Verileriniz, sadece yasal süreçler kapsamında yetkili devlet mercileriyle paylaşılabilir.
          </p>

          <h3>6. Haklarınız (KVKK Kapsamında)</h3>
          <p>
            KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, güncellenmesini veya silinmesini talep etme hakkına sahipsiniz. 
          </p>

          <hr className="my-8 border-zinc-100" />
          
          <p className="text-sm text-zinc-500 font-medium">
            Kişisel verilerinizle ilgili her türlü soru, talep ve şikayetiniz için bizimle <strong>bilgi@zirveakbas.com.tr</strong> adresinden veya doğrudan şirket merkezimizden iletişime geçebilirsiniz.
          </p>
        </div>

      </div>
    </main>
  );
}
