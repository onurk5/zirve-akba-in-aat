"use client"

import { useActionState } from "react"
import { submitContactForm } from "@/app/actions/message-actions"
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, undefined)

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-24">
      {/* PAGE HEADER */}
      <section className="relative py-24 lg:py-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/stats-bg.jpg" alt="Bize Ulaşın" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent"></div>
        </div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[2px] w-8 bg-[#E58C36]"></div>
            <span className="text-[#E58C36] font-bold tracking-[0.2em] text-sm uppercase">İletişim</span>
            <div className="h-[2px] w-8 bg-[#E58C36]"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">Bize Ulaşın</h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Kentsel dönüşüm süreciniz, yeni projeleriniz veya arsalarınız için uzman ekibimizle kahve içmeye bekleriz.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Info Side */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-3xl font-extrabold text-zinc-900 mb-4">İletişim Bilgilerimiz</h2>
                <p className="text-zinc-600 leading-relaxed">Uzman mühendislerimiz ve mimarlarımız, projenizin her aşamasında size destek olmak için hazır.</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:bg-[#E58C36] group-hover:text-white transition-colors duration-300 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 mb-2 uppercase tracking-widest text-sm">Merkez Ofis</h3>
                    <p className="text-zinc-600 leading-relaxed">Fenerbahçe Mah. Kalamış Cad. No:12<br/>Kadıköy, İstanbul</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:bg-[#E58C36] group-hover:text-white transition-colors duration-300 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 mb-2 uppercase tracking-widest text-sm">Telefon</h3>
                    <p className="text-zinc-600">0 (212) 555 00 00</p>
                    <p className="text-zinc-600">0 (532) 555 00 00</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:bg-[#E58C36] group-hover:text-white transition-colors duration-300 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 mb-2 uppercase tracking-widest text-sm">E-Posta</h3>
                    <p className="text-zinc-600">bilgi@zirveakbas.com.tr</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-zinc-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E58C36]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <h2 className="text-3xl font-extrabold text-zinc-900 mb-8 relative z-10">Bize Mesaj Gönderin</h2>
                
                {state?.success ? (
                  <div className="p-8 bg-zinc-900 text-white rounded-2xl text-center relative z-10">
                    <div className="w-20 h-20 bg-[#E58C36] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#E58C36]/30">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Mesajınız Ulaştı!</h3>
                    <p className="text-zinc-400">Talebiniz başarıyla alınmıştır. İlgili departmanımız en kısa sürede sizinle iletişime geçecektir.</p>
                  </div>
                ) : (
                  <form action={formAction} className="space-y-6 relative z-10">
                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2 uppercase tracking-widest">Adınız Soyadınız</label>
                      <input name="fullName" required className="w-full px-5 py-4 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-[#E58C36] focus:border-transparent outline-none transition-all bg-[#FAFAFA] text-zinc-900" placeholder="Örn: Ahmet Yılmaz" />
                      {state?.details?.fullName && <p className="text-red-500 text-xs mt-2 font-bold">{state.details.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-2 uppercase tracking-widest">E-posta</label>
                        <input name="email" type="email" required className="w-full px-5 py-4 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-[#E58C36] focus:border-transparent outline-none transition-all bg-[#FAFAFA] text-zinc-900" placeholder="ornek@email.com" />
                        {state?.details?.email && <p className="text-red-500 text-xs mt-2 font-bold">{state.details.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-2 uppercase tracking-widest">Telefon</label>
                        <input name="phone" required className="w-full px-5 py-4 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-[#E58C36] focus:border-transparent outline-none transition-all bg-[#FAFAFA] text-zinc-900" placeholder="05xx xxx xx xx" />
                        {state?.details?.phone && <p className="text-red-500 text-xs mt-2 font-bold">{state.details.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2 uppercase tracking-widest">Konu</label>
                      <input name="subject" required className="w-full px-5 py-4 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-[#E58C36] focus:border-transparent outline-none transition-all bg-[#FAFAFA] text-zinc-900" placeholder="Örn: Kentsel Dönüşüm Görüşmesi" />
                      {state?.details?.subject && <p className="text-red-500 text-xs mt-2 font-bold">{state.details.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2 uppercase tracking-widest">Mesajınız</label>
                      <textarea name="content" required rows={5} className="w-full px-5 py-4 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-[#E58C36] focus:border-transparent outline-none transition-all bg-[#FAFAFA] text-zinc-900 resize-y" placeholder="Projeniz veya arsanız hakkındaki detayları buraya yazabilirsiniz..."></textarea>
                      {state?.details?.content && <p className="text-red-500 text-xs mt-2 font-bold">{state.details.content}</p>}
                    </div>
                    
                    {state?.error && !state?.details && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
                        {state.error}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isPending}
                      className="w-full bg-zinc-900 text-white px-8 py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-[#E58C36] transition-colors flex items-center justify-center gap-3 shadow-xl shadow-zinc-900/20 disabled:opacity-70 group"
                    >
                      {isPending ? "Gönderiliyor..." : "Mesajı Gönder"} 
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="h-[500px] w-full bg-zinc-200 relative">
        <iframe 
          src="https://maps.google.com/maps?q=Kadıköy,%20İstanbul&t=&z=14&ie=UTF8&iwloc=&output=embed"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
          title="Ofis Konumu"
          className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
        ></iframe>
      </section>
    </main>
  )
}
