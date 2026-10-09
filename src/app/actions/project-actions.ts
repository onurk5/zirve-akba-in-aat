"use server"

import { db } from "@/lib/db"
import { projectSchema } from "@/lib/schemas"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function createProject(prevState: any, formData: FormData) {
  try {
    const session = await auth()
    if (!session) return { error: "Yetkisiz erişim. Lütfen giriş yapın." }

    const data: Record<string, any> = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      status: formData.get("status") as string,
      afterImage: formData.get("afterImage") as string,
      beforeImage: (formData.get("beforeImage") as string) || "",
      seoTitle: (formData.get("seoTitle") as string) || "",
      seoDesc: (formData.get("seoDesc") as string) || "",
      published: formData.get("published") === "on",
    }

    const validatedFields = projectSchema.safeParse(data)

    if (!validatedFields.success) {
      return { error: "Geçersiz veriler.", details: validatedFields.error.flatten().fieldErrors }
    }

    const project = await db.project.create({
      data: validatedFields.data,
    })
    revalidatePath("/admin/projeler")
    revalidatePath("/projeler")
    return { success: true, project }
  } catch (error: any) {
    console.error("Proje oluşturma hatası:", error)
    return { error: `Sistemsel bir hata oluştu: ${error.message || 'Bilinmeyen hata'}` }
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
  try {
    const session = await auth()
    if (!session) return { error: "Yetkisiz erişim. Lütfen giriş yapın." }

    const data: Record<string, any> = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      status: formData.get("status") as string,
      afterImage: formData.get("afterImage") as string,
      beforeImage: (formData.get("beforeImage") as string) || "",
      seoTitle: (formData.get("seoTitle") as string) || "",
      seoDesc: (formData.get("seoDesc") as string) || "",
      published: formData.get("published") === "on",
    }

    const validatedFields = projectSchema.safeParse(data)

    if (!validatedFields.success) {
      return { error: "Geçersiz veriler.", details: validatedFields.error.flatten().fieldErrors }
    }

    const project = await db.project.update({
      where: { id },
      data: validatedFields.data,
    })
    revalidatePath("/admin/projeler")
    revalidatePath("/projeler")
    revalidatePath(`/projeler/${project.slug}`)
    return { success: true, project }
  } catch (error: any) {
    console.error("Proje güncelleme hatası:", error)
    return { error: `Sistemsel bir hata oluştu: ${error.message || 'Bilinmeyen hata'}` }
  }
}
