"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function loginAction(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Geçersiz e-posta veya şifre." }
        default:
          return { error: "Beklenmeyen bir hata oluştu." }
      }
    }
    throw error; // Rethrow necessary for Next.js redirects to work
  }
}
