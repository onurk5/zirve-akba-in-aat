"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { supabase } from "@/lib/supabase"

export async function updateSettings(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session) return { error: "Yetkisiz erişim." }

  const companyName = formData.get("companyName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string
  const mapEmbedUrl = formData.get("mapEmbedUrl") as string
  let logoUrl = formData.get("logoUrl") as string
  const removeLogo = formData.get("removeLogo") === "true"
  
  const logoFile = formData.get("logoFile") as File | null

  try {
    if (logoFile && logoFile.size > 0) {
      const ext = logoFile.name.split('.').pop() || "png";
      const filename = `logo-${Date.now()}.${ext}`;
      
      const { data, error } = await supabase.storage.from('images').upload(filename, logoFile, {
        cacheControl: '3600',
        upsert: false
      });

      if (error) {
        throw new Error("Logo yüklenemedi: " + error.message);
      }
      
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filename);
      logoUrl = publicUrlData.publicUrl;
    }

    if (removeLogo) {
      logoUrl = "/logo.png"
    }

    const existing = await db.siteSettings.findFirst()
    
    if (existing) {
      await db.siteSettings.update({
        where: { id: existing.id },
        data: { companyName, email, phone, address, mapEmbedUrl, logoUrl }
      })
    } else {
      await db.siteSettings.create({
        data: { companyName, email, phone, address, mapEmbedUrl, logoUrl }
      })
    }
    
    revalidatePath("/")
    revalidatePath("/admin/ayarlar")
    return { success: true, message: "Ayarlar başarıyla güncellendi." }
  } catch (error: any) {
    console.error("Settings Action Error:", error)
    return { error: error.message || "Ayarlar kaydedilirken bir hata oluştu." }
  }
}
