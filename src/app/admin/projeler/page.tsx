import { db } from "@/lib/db"
import Link from "next/link"
import { Plus, Trash2, Edit, ExternalLink } from "lucide-react"
import { deleteProject } from "@/app/actions/project-actions"

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projeler</h2>
          <p className="text-muted-foreground text-sm mt-1">Tüm kentsel dönüşüm ve inşaat projelerinizi yönetin.</p>
        </div>
        <Link 
          href="/admin/projeler/yeni" 
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Yeni Proje Ekle
        </Link>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {projects.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
              <FolderKanban className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">Hiç proje yok</h3>
            <p className="text-muted-foreground text-sm">Sisteme henüz bir kentsel dönüşüm projesi eklemediniz.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/30 border-b">
              <tr>
                <th className="px-6 py-4 font-medium text-foreground">Proje Adı</th>
                <th className="px-6 py-4 font-medium text-foreground">Lokasyon</th>
                <th className="px-6 py-4 font-medium text-foreground">Durum</th>
                <th className="px-6 py-4 font-medium text-foreground text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map((project) => {
                const deleteAction = deleteProject.bind(null, project.id);
                
                return (
                  <tr key={project.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{project.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">/{project.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{project.location}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-secondary text-foreground text-xs font-medium rounded-full border">
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <a href={`/projeler/${project.slug}`} target="_blank" className="p-2 text-muted-foreground hover:text-primary transition-colors bg-white border rounded-lg shadow-sm" title="Görüntüle">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors bg-white border rounded-lg shadow-sm" title="Düzenle">
                          <Edit className="w-4 h-4" />
                        </button>
                        <form action={deleteAction}>
                          <button type="submit" className="p-2 text-muted-foreground hover:text-red-600 transition-colors bg-white border rounded-lg shadow-sm" title="Sil">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

// Just a dummy icon since I didn't import FolderKanban above for the empty state
function FolderKanban(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-1.2-1.8A2 2 0 0 0 7.55 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/></svg>
}
