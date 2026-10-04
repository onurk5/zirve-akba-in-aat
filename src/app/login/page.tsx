"use client"

import { useActionState } from "react"
import { loginAction } from "@/app/actions/auth-actions"
import { Building2 } from "lucide-react"

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined)

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Building2 className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-foreground mb-2">Yönetim Paneli</h1>
          <p className="text-center text-muted-foreground mb-8 text-sm">Devam etmek için yönetici girişi yapın.</p>
          
          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Kullanıcı Adı veya E-posta</label>
              <input 
                type="text" 
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Örn: hakan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Şifre</label>
              <input 
                type="password" 
                name="password"
                required
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            
            {state?.error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                {state.error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-70"
            >
              {isPending ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
        <div className="bg-secondary/50 p-4 text-center text-xs text-muted-foreground border-t">
          Sadece yetkili personeller erişebilir. Güvenli bağlantı sağlanmaktadır.
        </div>
      </div>
    </div>
  )
}
