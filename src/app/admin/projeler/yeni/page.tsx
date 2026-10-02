"use client"

import { useActionState, useEffect } from "react"
import { createProject } from "@/app/actions/project-actions"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewProjectPage() {
  const [state, formAction, isPending] = useActionState(createProject, undefined)
  const router = useRouter()

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
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Proje Başlığı</label>
              <input name="title" required className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Örn: Modern Yaşam Evleri" />
              {state?.details?.title && <p className="text-red-500 text-xs">{state.details.title}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">URL Yolu (Slug)</label>
              <input name="slug" required className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-muted/30" placeholder="orn: modern-yasam-evleri" />
              {state?.details?.slug && <p className="text-red-500 text-xs">{state.details.slug}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Lokasyon</label>
              <input name="location" required className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Örn: Kadıköy, İstanbul" />
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Öncesi Fotoğrafı URL (Opsiyonel)</label>
              <input name="beforeImage" type="url" className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Sonrası (Mevcut) Fotoğraf URL</label>
              <input name="afterImage" required type="url" className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="https://..." />
              {state?.details?.afterImage && <p className="text-red-500 text-xs">{state.details.afterImage}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">SEO Başlığı (Opsiyonel)</label>
              <input name="seoTitle" className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Meta title..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">SEO Açıklaması (Opsiyonel)</label>
              <input name="seoDesc" className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Meta description..." />
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
