"use client"

import { useState, useEffect, useRef } from "react"
import { supabaseClient, uploadImageClient } from "@/lib/upload-client"
import { Loader2, Plus, Image as ImageIcon, Trash2, Copy, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export default function MediaLibraryPage() {
  const [images, setImages] = useState<{ name: string; url: string; size: number; created_at: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchImages = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabaseClient.storage.from('images').list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      })
      
      if (error) throw error

      const validFiles = data?.filter(f => f.name !== '.emptyFolderPlaceholder') || []
      
      const fileList = validFiles.map(file => {
        const { data: urlData } = supabaseClient.storage.from('images').getPublicUrl(file.name)
        return { 
          name: file.name, 
          url: urlData.publicUrl,
          size: file.metadata?.size || 0,
          created_at: file.created_at || new Date().toISOString()
        }
      })

      setImages(fileList)
    } catch (error) {
      console.error("Görseller yüklenirken hata:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      await uploadImageClient(file)
      await fetchImages()
    } catch (error: any) {
      alert("Yükleme başarısız: " + error.message)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleDelete = async (fileName: string) => {
    if (!confirm("Bu görseli silmek istediğinize emin misiniz? (Eğer bir projede kullanılıyorsa orada görünmez olacaktır!)")) return
    
    setDeleting(fileName)
    try {
      const { error } = await supabaseClient.storage.from('images').remove([fileName])
      if (error) throw error
      await fetchImages()
    } catch (error: any) {
      alert("Silme başarısız: " + error.message)
    } finally {
      setDeleting(null)
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Görsel Kütüphanesi</h2>
          <p className="text-muted-foreground text-sm mt-1">Sisteme yüklenen tüm görselleri tek bir yerden yönetin.</p>
        </div>
        <div>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm disabled:opacity-70"
          >
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            {uploading ? "Yükleniyor..." : "Yeni Görsel Yükle"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-6 min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Görseller yükleniyor...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Hiç Görsel Yok</h3>
            <p className="text-muted-foreground text-sm max-w-sm">Henüz sisteme hiç görsel yüklememişsiniz. Yukarıdaki butonu kullanarak ilk görselinizi yükleyin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {images.map((img) => (
              <div key={img.name} className="group flex flex-col gap-2">
                <div className="relative aspect-square rounded-xl border overflow-hidden bg-muted">
                  <Image src={img.url} alt={img.name} fill className="object-cover transition-transform group-hover:scale-105" />
                  
                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => handleCopyUrl(img.url)}
                      title="URL'yi Kopyala"
                      className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors"
                    >
                      {copiedUrl === img.url ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <button 
                      onClick={() => handleDelete(img.name)}
                      title="Sil"
                      disabled={deleting === img.name}
                      className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors disabled:opacity-50"
                    >
                      {deleting === img.name ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="px-1">
                  <p className="text-xs font-medium text-foreground truncate" title={img.name}>{img.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted-foreground">{formatSize(img.size)}</span>
                    <span className="text-[10px] text-muted-foreground">{new Date(img.created_at).toLocaleDateString("tr-TR")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
