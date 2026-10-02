"use server"

import { db } from "@/lib/db"
import { projectSchema } from "@/lib/schemas"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function createProject(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session) return { error: "Yetkisiz erişim. Lütfen giriş yapın." }

  const data = Object.fromEntries(formData.entries())
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
