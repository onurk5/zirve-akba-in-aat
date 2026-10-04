import { db } from "@/lib/db";
import Link from "next/link";
import { PlusCircle, FileText, Trash2 } from "lucide-react";
import { deletePost } from "@/app/actions/post-actions";
import { revalidatePath } from "next/cache";

export default async function AdminNewsPage() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-900">Haberler & Blog</h1>
        <Link href="/admin/haberler/yeni" className="bg-[#E58C36] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-900 transition-colors shadow-lg">
          <PlusCircle className="w-5 h-5" />
          Yeni İçerik Ekle
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500 font-medium">Henüz içerik eklenmemiş.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-100 text-zinc-500">
                  <th className="pb-4 font-bold">Başlık</th>
                  <th className="pb-4 font-bold">Durum</th>
                  <th className="pb-4 font-bold">Tarih</th>
                  <th className="pb-4 font-bold text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {posts.map((post) => (
                  <tr key={post.id} className="group">
                    <td className="py-4 font-bold text-zinc-900">{post.title}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${post.published ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-600'}`}>
                        {post.published ? "Yayında" : "Taslak"}
                      </span>
                    </td>
                    <td className="py-4 text-zinc-500">{new Date(post.createdAt).toLocaleDateString("tr-TR")}</td>
                    <td className="py-4 text-right">
                      <form action={async () => {
                        "use server";
                        await deletePost(post.id);
                        revalidatePath("/admin/haberler");
                      }}>
                        <button type="submit" className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
