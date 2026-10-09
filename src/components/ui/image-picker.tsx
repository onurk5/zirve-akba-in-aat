"use client"

import React, { useState, useEffect, useRef } from "react"
import { supabaseClient, uploadImageClient } from "@/lib/upload-client"
import { Loader2, Plus, Image as ImageIcon, X, CheckCircle2 } from "lucide-react"
import Image from "next/image"

interface ImagePickerProps {
  value?: string
  onChange: (url: string) => void
  disabled?: boolean
  label?: string
}

export function ImagePicker({ value, onChange, disabled, label = "Görsel Seç" }: ImagePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState<{ name: string; url: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
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
      
      const fileUrls = validFiles.map(file => {
        const { data: urlData } = supabaseClient.storage.from('images').getPublicUrl(file.name)
        return { name: file.name, url: urlData.publicUrl }
      })

      setImages(fileUrls)
    } catch (error) {
      console.error("Görseller yüklenirken hata:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchImages()
    }
  }, [isOpen])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadImageClient(file)
      await fetchImages() // Refresh the list
      onChange(url) // Auto select
      setIsOpen(false) // Close modal
    } catch (error: any) {
      alert("Yükleme başarısız: " + error.message)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div 
        onClick={() => !disabled && setIsOpen(true)}
        className={`relative flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer overflow-hidden transition-colors ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500"
        } ${value ? "border-solid border-gray-300" : "border-gray-300"}`}
      >
        {value ? (
          <Image src={value} alt="Seçilen Görsel" fill className="object-contain" />
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <ImageIcon className="w-10 h-10 mb-2" />
            <span className="text-sm font-medium">{label}</span>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Görsel Kütüphanesi</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
              <p className="text-sm text-gray-600">Projenizdeki tüm görseller burada listelenir.</p>
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
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Yeni Görsel Yükle
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : images.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                  <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
                  <p>Henüz hiç görsel yüklenmemiş.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((img, idx) => {
                    const isSelected = value === img.url
                    return (
                      <div 
                        key={idx} 
                        onClick={() => {
                          onChange(img.url)
                          setIsOpen(false)
                        }}
                        className={`relative aspect-square rounded-lg border-2 overflow-hidden cursor-pointer group ${
                          isSelected ? "border-blue-600" : "border-gray-200 hover:border-blue-400"
                        }`}
                      >
                        <Image src={img.url} alt={img.name} fill className="object-cover" />
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-white text-sm font-medium px-2 py-1 bg-black/50 rounded">Seç</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
