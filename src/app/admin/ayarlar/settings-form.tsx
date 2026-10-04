"use client"

import { useActionState } from "react"
import { updateSettings } from "@/app/actions/settings-actions"
import { SubmitButton } from "@/components/ui/submit-button"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, AlertCircle, Image as ImageIcon, Trash2 } from "lucide-react"

export function SettingsForm({ initialData }: { initialData: any }) {
  const [state, action] = useActionState(updateSettings, null)
  const [removeLogo, setRemoveLogo] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      setSuccessMsg("Ayarlarınız başarıyla kaydedildi.")
      setRemoveLogo(false)
      if (formRef.current) formRef.current.reset()
      router.refresh()
      
      const timer = setTimeout(() => setSuccessMsg(""), 5000)
      return () => clearTimeout(timer)
    }
  }, [state, router])

  return (
    <form ref={formRef} action={action} className="space-y-6">
      
      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-3 border border-emerald-100">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <p className="font-medium text-sm">{successMsg}</p>
        </div>
      )}

      {state?.error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="font-medium text-sm">{state.error}</p>
        </div>
      )}

      <input type="hidden" name="removeLogo" value={removeLogo ? "true" : "false"} />
      <div className="space-y-4 p-5 border rounded-2xl bg-zinc-50/50">
        <div className="flex items-center gap-2 mb-2">
          <ImageIcon className="w-5 h-5 text-zinc-400" />
          <h3 className="font-bold text-zinc-700">Logo Ayarları</h3>
        </div>
        
        {initialData.logoUrl && initialData.logoUrl !== "/logo.png" && !removeLogo && (
          <div className="mb-4 p-4 bg-white rounded-xl border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-24 h-12 relative bg-zinc-100 rounded-lg flex items-center justify-center p-2">
                <img src={initialData.logoUrl} alt="Mevcut Logo" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Mevcut Özel Logonuz</p>
                <p className="text-zinc-500 text-xs">Aktif olarak sitede gösteriliyor.</p>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setRemoveLogo(true)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" /> Kaldır
            </button>
          </div>
        )}

        {removeLogo && (
          <div className="mb-4 p-4 bg-orange-50 text-orange-700 rounded-xl border border-orange-100 flex items-center justify-between">
            <span className="text-sm font-medium">Özel logonuz kaldırılacak ve varsayılan logoya dönülecek. (Kaydetmelisiniz)</span>
            <button type="button" onClick={() => setRemoveLogo(false)} className="text-sm underline font-bold">Vazgeç</button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">Bilgisayardan Yükle</label>
            <input 
              type="file"
              name="logoFile" 
              accept="image/*"
              className="w-full flex h-11 rounded-xl border bg-white px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-zinc-100 file:text-zinc-900 file:text-sm file:font-semibold file:rounded-md file:px-3 file:py-1 file:mr-3 hover:file:bg-zinc-200" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">Veya Logo URL'si Girin</label>
            <input 
              name="logoUrl" 
              defaultValue={initialData.logoUrl || "/logo.png"} 
              placeholder="https://..."
              className="w-full flex h-11 rounded-xl border bg-white px-3 py-2 text-sm shadow-sm" 
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Sadece yeni bir dosya seçtiğinizde veya URL girdiğinizde logo değişir. PNG veya SVG formatı tavsiye edilir.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Firma Adı</label>
        <input name="companyName" defaultValue={initialData.companyName} required className="w-full flex h-10 rounded-md border bg-background px-3 py-2 text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">E-posta</label>
        <input name="email" type="email" defaultValue={initialData.email} required className="w-full flex h-10 rounded-md border bg-background px-3 py-2 text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Telefon</label>
        <input name="phone" defaultValue={initialData.phone} required className="w-full flex h-10 rounded-md border bg-background px-3 py-2 text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Adres</label>
        <textarea name="address" defaultValue={initialData.address} required rows={3} className="w-full flex rounded-md border bg-background px-3 py-2 text-sm"></textarea>
      </div>
      <div className="space-y-2 hidden">
        <label className="text-sm font-medium">Harita Embed URL (Opsiyonel)</label>
        <input name="mapEmbedUrl" defaultValue={initialData.mapEmbedUrl} className="w-full flex h-10 rounded-md border bg-background px-3 py-2 text-sm" />
      </div>
      
      <div className="pt-4">
        <SubmitButton>Ayarları Kaydet</SubmitButton>
      </div>
    </form>
  )
}
