import { db } from "@/lib/db"
import { Mail, Calendar } from "lucide-react"

export default async function AdminMessagesPage() {
  const messages = await db.message.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // Optionally we can mark messages as read when viewed, but for now we list them.

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gelen Kutusu</h2>
          <p className="text-muted-foreground text-sm mt-1">Ziyaretçilerinizden gelen iletişim formlarını ve talepleri yönetin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {messages.length === 0 ? (
          <div className="bg-white rounded-2xl border shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">Kutunuz Boş</h3>
            <p className="text-muted-foreground text-sm">Henüz bir mesaj almadınız.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`bg-white rounded-2xl border shadow-sm p-6 ${msg.isRead ? 'opacity-80' : 'border-l-4 border-l-primary'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{msg.subject}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span className="font-medium text-foreground">{msg.fullName}</span> • 
                    <a href={`mailto:${msg.email}`} className="hover:text-primary transition-colors">{msg.email}</a> • 
                    <span>{msg.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border">
                  <Calendar className="w-3 h-3" />
                  {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
                </div>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-xl text-sm leading-relaxed text-foreground border border-border/50">
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
