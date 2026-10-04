import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata = {
  title: "Haberler & Kentsel Dönüşüm Rehberi | Zirve Akbaş İnşaat",
  description: "Kentsel dönüşüm süreci, devlet destekleri, inşaat sektörü haberleri ve firmamızdan güncel gelişmeler.",
};

export default async function NewsPage() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-24">
      {/* PAGE HEADER */}
      <section className="relative py-24 lg:py-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-bg.jpg" alt="Haberler" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
        </div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[2px] w-8 bg-[#E58C36]"></div>
            <span className="text-[#E58C36] font-bold tracking-[0.2em] text-sm uppercase">Medya & Blog</span>
            <div className="h-[2px] w-8 bg-[#E58C36]"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">Haberler & Rehber</h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Sektörel gelişmeler, kentsel dönüşüm rehberleri ve projelerimizden en güncel haberler.
          </p>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-zinc-100">
              <p className="text-xl text-zinc-500 font-medium">Henüz bir içerik eklenmemiş.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link href={`/haberler/${post.slug}`} key={post.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg shadow-zinc-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    {post.image ? (
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full bg-zinc-200 flex items-center justify-center">
                        <span className="text-zinc-400 font-medium">Görsel Yok</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90 text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-4 group-hover:text-[#E58C36] transition-colors line-clamp-2">{post.title}</h2>
                    <p className="text-zinc-600 mb-6 line-clamp-3 leading-relaxed flex-1">
                      {post.summary}
                    </p>
                    
                    <div className="flex items-center gap-2 text-[#E58C36] font-bold text-sm uppercase tracking-widest mt-auto">
                      Devamını Oku <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
