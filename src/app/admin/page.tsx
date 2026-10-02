import { db } from "@/lib/db"
import { FolderKanban, MessageSquare, Bell } from "lucide-react"

export default async function AdminDashboard() {
  const projectCount = await db.project.count()
  const unreadMessagesCount = await db.message.count({ where: { isRead: false } })
  const totalMessagesCount = await db.message.count()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Sisteme Hoş Geldiniz</h1>
        <p className="text-muted-foreground mt-1">Sitenizin genel istatistiklerini ve özetini buradan görebilirsiniz.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <FolderKanban className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Aktif Projeler</p>
            <h3 className="text-3xl font-bold">{projectCount}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Bell className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Okunmamış Mesajlar</p>
            <h3 className="text-3xl font-bold">{unreadMessagesCount}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Toplam Mesajlar</p>
            <h3 className="text-3xl font-bold">{totalMessagesCount}</h3>
          </div>
        </div>
      </div>
      
      {/* İleride Son Eklenen Projeler veya Son Gelen Mesajlar Tablosu eklenebilir */}
    </div>
  )
}
