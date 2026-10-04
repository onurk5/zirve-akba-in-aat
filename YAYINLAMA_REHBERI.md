# Zirve Akbaş İnşaat - Siteyi Yayına Alma (Canlıya Çıkış) Rehberi

Siteyi tamamen **ücretsiz** bir şekilde yayına almak için aşağıdaki 3 hesabı oluşturmanız ve projeye bağlamanız yeterlidir. Tüm kod altyapısı bu sistemlere tam uyumlu olacak şekilde hazırlanmıştır.

## 1. Veritabanı Kurulumu (Supabase)
Sitenizdeki projelerin, haberlerin ve mesajların kaydedileceği yerdir.

1. [supabase.com](https://supabase.com) adresine gidin ve GitHub hesabınızla veya e-posta ile ücretsiz kayıt olun.
2. Yeni bir proje oluşturun (New Project). Şifre kısmını (Database Password) güvenli bir şifre yapın ve bir yere not edin.
3. Proje oluştuktan sonra sol menüden **Settings -> Database** bölümüne gidin.
4. "Connection String" (URI) bölümünden veritabanı adresinizi kopyalayın.
5. Sitenizin kodlarındaki `prisma/schema.prisma` dosyasını açın:
   - SQLite yazan bölümü yorum satırı yapın (`//`).
   - PostgreSQL yazan bölümün başındaki `//` işaretlerini kaldırarak aktifleştirin.

## 2. Resim Yükleme Sistemi (Cloudinary veya Uploadthing)
Admin panelinden resim yüklemek için Vercel yerine bulut depolama kullanılmalıdır.

1. [cloudinary.com](https://cloudinary.com) veya [uploadthing.com](https://uploadthing.com) adresine ücretsiz kayıt olun.
2. Size verilen API Key ve Secret kodlarını alın.

## 3. Siteyi Yayına Alma (Vercel)
Sitenin dünyadan erişilebilir olacağı ana sunucudur.

1. Kodlarınızı kendi [GitHub](https://github.com) hesabınıza yükleyin (Push yapın).
2. [vercel.com](https://vercel.com) adresine gidin ve ücretsiz hesap açın.
3. "Add New Project" diyerek GitHub hesabınızı bağlayın ve yüklediğiniz projeyi seçin.
4. Kurulum ekranında "Environment Variables" (Ortam Değişkenleri) kısmına şunları ekleyin:
   - `DATABASE_URL`: Supabase'den aldığınız veritabanı adresi.
   - `NEXTAUTH_SECRET`: Rastgele oluşturduğunuz karmaşık bir şifre.
   - `NEXTAUTH_URL`: `https://zirveakbas.com.tr` (veya Vercel'in size verdiği geçici link).
   - *(Resim yükleme için Cloudinary veya Uploadthing API şifreleri).*
5. "Deploy" butonuna basın. 2 dakika içinde siteniz canlıda!

## 4. Alan Adı (Domain) Bağlama
Vercel projeniz oluştuktan sonra, Vercel panelinde **Settings -> Domains** bölümüne girip satın aldığınız `zirveakbas.com.tr` alan adını yazın. Size verilen DNS numaralarını domaini satın aldığınız firmanın paneline girin. İşlem tamam!
