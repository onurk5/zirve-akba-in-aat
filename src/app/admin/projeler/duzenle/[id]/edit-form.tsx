"use client"

import { useActionState, useEffect, useState } from "react"
import { updateProject } from "@/app/actions/project-actions"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LocationSelector } from "@/components/ui/location-selector"
import { uploadImageClient } from "@/lib/upload-client"

export default function EditProjectForm({ project }: { project: any }) {
  const updateProjectWithId = updateProject.bind(null, project.id)
  const [state, formAction, isPending] = useActionState(updateProjectWithId, undefined)
  const router = useRouter()

  const [title, setTitle] = useState(project.title)
  const [slug, setSlug] = useState(project.slug)
  const [seoTitle, setSeoTitle] = useState(project.seoTitle || "")
  const [seoDesc, setSeoDesc] = useState(project.seoDesc || "")
  const [published, setPublished] = useState(project.published)
  const [beforeImageUrl, setBeforeImageUrl] = useState(project.beforeImage || "")
  const [afterImageUrl, setAfterImageUrl] = useState(project.afterImage || "")
  const [beforeImagePreview, setBeforeImagePreview] = useState<string | null>(project.beforeImage || null)
  const [afterImagePreview, setAfterImagePreview] = useState<string | null>(project.afterImage || null)
  const [uploadingBefore, setUploadingBefore] = useState(false)
  const [uploadingAfter, setUploadingAfter] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    
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

  const handleFileSelect = async (file: File, type: "before" | "after") => {
    setUploadError(null)
    const preview = URL.createObjectURL(file)

    if (type === "before") {
      setBeforeImagePreview(preview)
      setUploadingBefore(true)
    } else {
      setAfterImagePreview(preview)
      setUploadingAfter(true)
    }

    try {
      const url = await uploadImageClient(file)
      if (type === "before") {
        setBeforeImageUrl(url)
      } else {
        setAfterImageUrl(url)
      }
    } catch (err: any) {
      setUploadError(err.message || "Resim yüklenirken hata oluştu.")
      if (type === "before") {
        setBeforeImagePreview(project.beforeImage || null)
        setBeforeImageUrl(project.beforeImage || "")
      } else {
        setAfterImagePreview(project.afterImage || null)
        setAfterImageUrl(project.afterImage || "")
      }
    } finally {
      if (type === "before") {
        setUploadingBefore(false)
      } else {
        setUploadingAfter(false)
      }
    }
  }

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/projeler")
    }
  }, [state, router])

  const isUploading = uploadingBefore || uploadingAfter

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projeyi Düzenle</h2>
          <p className="text-muted-foreground text-sm mt-1">{project.title} projesini güncelliyorsunuz.</p>
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
          {/* Hidden inputs for uploaded image URLs */}
          <input type="hidden" name="afterImage" value={afterImageUrl} />
          <input type="hidden" name="beforeImage" value={beforeImageUrl} />

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
              <LocationSelector defaultValue={project.location} />
              {state?.details?.location && <p className="text-red-500 text-xs">{state.details.location}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Proje Durumu</label>
              <select name="status" defaultValue={project.status} required className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white">
                <option value="Tamamlandı">Tamamlandı</option>
                <option value="Devam Ediyor">Devam Ediyor</option>
                <option value="Planlama Aşamasında">Planlama Aşamasında</option>
              </select>
              {state?.details?.status && <p className="text-red-500 text-xs">{state.details.status}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-foreground">Açıklama (Mimari ve Teknik Detaylar)</label>
              <textarea name="description" defaultValue={project.description} required rows={4} className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y" placeholder="Projenin detaylı açıklamasını girin..."></textarea>
              {state?.details?.description && <p className="text-red-500 text-xs">{state.details.description}</p>}
            </div>

            <div className="space-y-4 md:col-span-2 p-4 bg-muted/20 rounded-xl border">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Öncesi Fotoğrafı (Opsiyonel)</label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex-1 w-full">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file, "before");
                      }}
                      className="w-full px-4 py-2 bg-white rounded-lg border text-sm" 
                    />
                  </div>
                  {uploadingBefore && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" /> Yükleniyor...
                    </div>
                  )}
                  {beforeImagePreview && !uploadingBefore && (
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
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file, "after");
                      }}
                      className="w-full px-4 py-2 bg-white rounded-lg border text-sm" 
                    />
                  </div>
                  {uploadingAfter && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" /> Yükleniyor...
                    </div>
                  )}
                  {afterImagePreview && !uploadingAfter && (
                    <div className="w-full sm:w-32 h-24 shrink-0 rounded-lg overflow-hidden border relative bg-zinc-100">
                      <img src={afterImagePreview} alt="Sonrası" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                {state?.details?.afterImage && <p className="text-red-500 text-xs mt-2">{state.details.afterImage}</p>}
                <p className="text-xs text-muted-foreground mt-3">Mevcut görseli değiştirmek istiyorsanız yeni bir dosya seçin. Boş bırakırsanız mevcut görsel korunur.</p>
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

          {uploadError && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {uploadError}
            </div>
          )}

          {state?.error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {state.error}
            </div>
          )}

          <div className="pt-4 border-t flex justify-end">
            <button 
              type="submit" 
              disabled={isPending || isUploading || !afterImageUrl}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm disabled:opacity-70"
            >
              <Save className="w-4 h-4" /> {isPending ? "Kaydediliyor..." : isUploading ? "Resim yükleniyor..." : "Değişiklikleri Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
