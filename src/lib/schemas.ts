import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(3, "Kullanıcı adı veya e-posta giriniz."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
});

export const projectSchema = z.object({
  title: z.string().min(3, "Proje başlığı en az 3 karakter olmalıdır."),
  slug: z.string().min(3, "URL yolu (slug) en az 3 karakter olmalıdır."),
  description: z.string().min(10, "Proje açıklaması en az 10 karakter olmalıdır."),
  location: z.string().min(2, "Lokasyon bilgisi zorunludur."),
  status: z.enum(["Tamamlandı", "Devam Ediyor", "Planlama Aşamasında"]),
  beforeImage: z.string().optional().or(z.literal("")),
  afterImage: z.string({ required_error: "Lütfen bir görsel ekleyin." }).min(1, "Lütfen bir görsel ekleyin."),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
});

export const contactFormSchema = z.object({
  fullName: z.string().min(3, "Ad soyad en az 3 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  phone: z.string().min(10, "Lütfen geçerli bir telefon numarası giriniz."),
  subject: z.string().min(3, "Konu en az 3 karakter olmalıdır."),
  content: z.string().min(10, "Mesajınız en az 10 karakter olmalıdır."),
});
