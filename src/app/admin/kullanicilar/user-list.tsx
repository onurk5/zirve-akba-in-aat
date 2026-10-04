"use client"

import { useState } from "react"
import { deleteUser, createUser } from "@/app/actions/user-actions"
import { Trash2, UserPlus, X } from "lucide-react"
import { SubmitButton } from "@/components/ui/submit-button"
import { useEffect, useActionState } from "react"
import { useRouter } from "next/navigation"

export function UserList({ users }: { users: any[] }) {
  const [showForm, setShowForm] = useState(false)
  const [state, action] = useActionState(createUser, null)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      setShowForm(false)
      alert("Yönetici başarıyla eklendi.")
      router.refresh()
    } else if (state?.error) {
      alert(state.error)
    }
  }, [state, router])

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`'${name}' adlı yöneticiyi silmek istediğinize emin misiniz?`)) {
      const res = await deleteUser(id)
      if (res.error) {
        alert(res.error)
      }
    }
  }

  return (
    <div className="space-y-6">
      {!showForm ? (
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          <UserPlus className="w-4 h-4" /> Yeni Yönetici Ekle
        </button>
      ) : (
        <div className="bg-white p-6 rounded-xl border max-w-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Yeni Yönetici</h3>
            <button onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-zinc-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form action={action} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Ad Soyad</label>
              <input name="name" required className="w-full h-10 rounded-md border px-3" />
            </div>
            <div>
              <label className="text-sm font-medium">E-posta</label>
              <input name="email" type="email" required className="w-full h-10 rounded-md border px-3" />
            </div>
            <div>
              <label className="text-sm font-medium">Şifre</label>
              <input name="password" type="password" required minLength={6} className="w-full h-10 rounded-md border px-3" />
            </div>
            <SubmitButton>Kaydet</SubmitButton>
          </form>
        </div>
      )}

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium text-zinc-500">Ad Soyad</th>
              <th className="px-6 py-4 font-medium text-zinc-500">E-posta</th>
              <th className="px-6 py-4 font-medium text-zinc-500">Eklenme Tarihi</th>
              <th className="px-6 py-4 font-medium text-zinc-500 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-50/50">
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4 text-zinc-500">{user.email}</td>
                <td className="px-6 py-4 text-zinc-500">
                  {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(user.id, user.name)}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                  Hiç kullanıcı bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
