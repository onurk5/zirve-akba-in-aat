"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import bcrypt from "bcryptjs"

export async function createUser(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session) return { error: "Yetkisiz erişim." }

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "Lütfen tüm alanları doldurun." }
  }

  if (password.length < 6) {
    return { error: "Şifre en az 6 karakter olmalıdır." }
  }

  try {
    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return { error: "Bu e-posta adresi zaten kullanımda." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    revalidatePath("/admin/kullanicilar")
    return { success: true }
  } catch (error) {
    return { error: "Kullanıcı oluşturulurken hata meydana geldi." }
  }
}

export async function deleteUser(id: string) {
  const session = await auth()
  if (!session) return { error: "Yetkisiz erişim." }

  if (session.user?.id === id || session.user?.email === id) {
    // If the ID matches, or just general prevention
    // Let's rely on email checking just in case
  }

  try {
    const targetUser = await db.user.findUnique({ where: { id } })
    if (targetUser?.email === session.user?.email) {
      return { error: "Kendinizi silemezsiniz." }
    }

    await db.user.delete({
      where: { id }
    })
    
    revalidatePath("/admin/kullanicilar")
    return { success: true }
  } catch (error) {
    return { error: "Silme işlemi başarısız oldu." }
  }
}
