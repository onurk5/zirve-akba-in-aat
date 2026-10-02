import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FolderKanban, MessageSquare, Settings, LogOut } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b">
          <span className="text-xl font-bold text-primary">Yönetim<span className="text-foreground">Paneli</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <LayoutDashboard className="w-5 h-5 text-muted-foreground" />
            Dashboard
          </Link>
          <Link href="/admin/projeler" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <FolderKanban className="w-5 h-5 text-muted-foreground" />
            Projeler
          </Link>
          <Link href="/admin/mesajlar" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
            Gelen Kutusu
          </Link>
          <Link href="/admin/ayarlar" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
            Genel Ayarlar
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer transition-colors">
            <LogOut className="w-5 h-5" />
            Çıkış Yap
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b flex items-center justify-end px-8">
          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <p className="font-medium text-foreground">{session.user?.name}</p>
              <p className="text-muted-foreground text-xs">Yönetici</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {session.user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
