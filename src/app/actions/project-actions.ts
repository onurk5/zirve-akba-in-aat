"use server"

import { db } from "@/lib/db"
import { projectSchema } from "@/lib/schemas"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import path from "path"
import { supabase } from "@/lib/supabase"

async function handleFileUpload(file: File | null) {
  if (!file || file.size === 0) return null;
  
  const ext = file.name.split('.').pop() || "jpg";
  const filename = `${Date.now()}-${Math.round(Math.random() * 10000)}.${ext}`;
  
  const { data, error } = await supabase
    .storage
    .from('images')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error("Supabase yükleme hatası:", error);
    return null;
  }

  const { data: publicUrlData } = supabase
    .storage
    .from('images')
    .getPublicUrl(filename);
    
  return publicUrlData.publicUrl;
}

export async function createProject(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session) return { error: "Yetkisiz erişim. Lütfen giriş yapın." }

  const data = Object.fromEntries(formData.entries())

  // Handle files
  const uploadedAfter = await handleFileUpload(formData.get("afterImageFile") as File | null);
  if (uploadedAfter) data.afterImage = uploadedAfter;

  const uploadedBefore = await handleFileUpload(formData.get("beforeImageFile") as File | null);
  if (uploadedBefore) data.beforeImage = uploadedBefore;

  const validatedFields = projectSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: "Geçersiz veriler.", details: validatedFields.error.flatten().fieldErrors }
  }

  try {
    const project = await db.project.create({
      data: validatedFields.data,
    })
    revalidatePath("/admin/projeler")
    revalidatePath("/projeler")
    return { success: true, project }
  } catch (error) {
    console.error("Proje oluşturma hatası:", error)
    return { error: "Proje oluşturulurken sistemsel bir hata meydana geldi." }
  }
}

export async function deleteProject(id: string) {
  const session = await auth()
  if (!session) return { error: "Yetkisiz erişim." }

  try {
    await db.project.delete({
      where: { id },
    })
    revalidatePath("/admin/projeler")
    revalidatePath("/projeler")
    return { success: true }
  } catch (error) {
    return { error: "Proje silinirken hata oluştu." }
  }
}

export async function toggleProjectStatus(id: string, currentStatus: boolean) {
  const session = await auth()
  if (!session) return { error: "Yetkisiz erişim." }

  try {
    await db.project.update({
      where: { id },
      data: { published: !currentStatus }
    })
    revalidatePath("/admin/projeler")
    revalidatePath("/projeler")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Proje durumu güncellenirken hata oluştu." }
  }
}

export async function updateProject(id: string, prevState: any, formData: FormData) {
  const session = await auth()
  if (!session) return { error: "Yetkisiz erişim. Lütfen giriş yapın." }

  const data = Object.fromEntries(formData.entries())
  
  // checkbox data
  data.published = formData.get('published') === 'on' ? 'true' : 'false';
  if (data.published === 'true') {
      data.published = true as any;
  } else {
      data.published = false as any;
  }

  // Handle files
  const uploadedAfter = await handleFileUpload(formData.get("afterImageFile") as File | null);
  if (uploadedAfter) {
    data.afterImage = uploadedAfter;
  } else if (!data.afterImage) {
    // Prevent empty string from breaking schema if they didn't upload a new one and deleted the old one
    // But actually, we should just let the schema catch it
  }

  const uploadedBefore = await handleFileUpload(formData.get("beforeImageFile") as File | null);
  if (uploadedBefore) data.beforeImage = uploadedBefore;

  const validatedFields = projectSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: "Geçersiz veriler.", details: validatedFields.error.flatten().fieldErrors }
  }

  try {
    const project = await db.project.update({
      where: { id },
      data: validatedFields.data,
    })
    revalidatePath("/admin/projeler")
    revalidatePath("/projeler")
    revalidatePath(`/projeler/${project.slug}`)
    return { success: true, project }
  } catch (error) {
    console.error("Proje güncelleme hatası:", error)
    return { error: "Proje güncellenirken sistemsel bir hata meydana geldi." }
  }
}
