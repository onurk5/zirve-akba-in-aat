"use server"

import { db } from "@/lib/db"
import { contactFormSchema } from "@/lib/schemas"
import { revalidatePath } from "next/cache"

export async function submitContactForm(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const validatedFields = contactFormSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: "Lütfen form alanlarını eksiksiz ve doğru doldurun.", details: validatedFields.error.flatten().fieldErrors }
  }

  try {
    await db.message.create({
      data: validatedFields.data,
    })
    revalidatePath("/admin/mesajlar") // Adminin görmesi için cache güncellenir
    return { success: true }
  } catch (error) {
    console.error("Mesaj gönderim hatası:", error)
    return { error: "Mesajınız iletilemedi. Lütfen daha sonra tekrar deneyin." }
  }
}
