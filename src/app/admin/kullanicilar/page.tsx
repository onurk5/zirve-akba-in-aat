import { db } from "@/lib/db"
import { UserList } from "./user-list"

export default async function UsersPage() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Yöneticiler</h1>
          <p className="text-muted-foreground">Sisteme giriş yapabilen yönetici hesaplarını yönetin.</p>
        </div>
      </div>
      
      <UserList users={users} />
    </div>
  )
}
