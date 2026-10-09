"use client"

import { useActionState, useEffect, useState } from "react"
import { createProject } from "@/app/actions/project-actions"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LocationSelector } from "@/components/ui/location-selector"

export default function NewProjectPage() {
  const [state, formAction, isPending] = useActionState(createProject, undefined)
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDesc, setSeoDesc] = useState("")
  const [published, setPublished] = useState(true)
  const [beforeImagePreview, setBeforeImagePreview] = useState<string | null>(null)
  const [afterImagePreview, setAfterImagePreview] = useState<string | null>(null)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    
    // Generate slug
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    
    setSlug(generatedSlug)
    setSeoTitle(val)
    setSeoDesc(`${val} kentsel dönüşüm ve inşaat projesi hakkında detaylı bilgiler.`)
  }

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/projeler")
    }
  }, [state, router])

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Yeni Proje Ekle</h2>
          <p className="text-muted-foreground text-sm mt-1">Sisteme yeni bir kentsel dönüşüm projesi tanımlayın.</p>
        </div>
        <Link 
          href="/admin/projeler" 
          className="bg-secondary text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 flex items-center gap-2 border transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Geri Dön
        </Link>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8">
        <form action={formAction} className="space-y-6" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Proje Başlığı</label>
              <input name="title" value={title} onChange={handleTitleChange} required className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Örn: Modern Yaşam Evleri" />
              {state?.details?.title && <p className="text-red-500 text-xs">{state.details.title}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">URL Yolu (Slug)</label>
              <input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-muted/10" placeholder="orn: modern-yasam-evleri" />
              {state?.details?.slug && <p className="text-red-500 text-xs">{state.details.slug}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <LocationSelector />
              {state?.details?.location && <p className="text-red-500 text-xs">{state.details.location}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Proje Durumu</label>
              <select name="status" required className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white">
                <option value="Tamamlandı">Tamamlandı</option>
                <option value="Devam Ediyor">Devam Ediyor</option>
                <option value="Planlama Aşamasında">Planlama Aşamasında</option>
              </select>
              {state?.details?.status && <p className="text-red-500 text-xs">{state.details.status}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-foreground">Açıklama (Mimari ve Teknik Detaylar)</label>
              <textarea name="description" required rows={4} className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y" placeholder="Projenin detaylı açıklamasını girin..."></textarea>
              {state?.details?.description && <p className="text-red-500 text-xs">{state.details.description}</p>}
            </div>

            <div className="space-y-4 md:col-span-2 p-4 bg-muted/20 rounded-xl border">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Öncesi Fotoğrafı (Opsiyonel)</label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex-1 w-full">
                    <input 
                      name="beforeImageFile" 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setBeforeImagePreview(URL.createObjectURL(file));
                      }}
                      className="w-full px-4 py-2 bg-white rounded-lg border text-sm" 
                    />
                  </div>
                  {beforeImagePreview && (
                    <div className="w-full sm:w-32 h-24 shrink-0 rounded-lg overflow-hidden border relative bg-zinc-100">
                      <img src={beforeImagePreview} alt="Öncesi" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-foreground block mb-2">Sonrası (Kapak) Fotoğrafı *</label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex-1 w-full">
                    <input 
                      name="afterImageFile" 
                      type="file" 
                      accept="image/*" 
                      required
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setAfterImagePreview(URL.createObjectURL(file));
                      }}
                      className="w-full px-4 py-2 bg-white rounded-lg border text-sm" 
                    />
                  </div>
                  {afterImagePreview && (
                    <div className="w-full sm:w-32 h-24 shrink-0 rounded-lg overflow-hidden border relative bg-zinc-100">
                      <img src={afterImagePreview} alt="Sonrası" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                {state?.details?.afterImage && <p className="text-red-500 text-xs mt-2">{state.details.afterImage}</p>}
                <p className="text-xs text-muted-foreground mt-3">Sadece bilgisayarınızdan veya cihazınızdan görsel yükleyebilirsiniz.</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">SEO Başlığı (Opsiyonel)</label>
              <input name="seoTitle" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Meta title..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Kısa Açıklama (Alt Başlık / SEO) *</label>
              <input name="seoDesc" value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Modern mimari çizgiler ve en üst düzey güvenlik..." />
              <p className="text-xs text-muted-foreground mt-1">Bu alan proje detay sayfasındaki dev başlığın hemen altında görünür. Aynı zamanda Google aramalarında özet metin (SEO) olarak kullanılır.</p>
            </div>
            
            <div className="space-y-2 flex items-center gap-2 mt-4 md:col-span-2">
              <input type="checkbox" id="published" name="published" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 text-primary rounded focus:ring-primary" />
              <label htmlFor="published" className="text-sm font-medium text-foreground cursor-pointer">Projeyi Yayında Göster (Site üzerinde görünür olsun)</label>
            </div>
          </div>

          {state?.error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {state.error}
            </div>
          )}

          <div className="pt-4 border-t flex justify-end">
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm disabled:opacity-70"
            >
              <Save className="w-4 h-4" /> {isPending ? "Kaydediliyor..." : "Projeyi Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
