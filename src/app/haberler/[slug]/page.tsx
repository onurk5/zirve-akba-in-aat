import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug }
  });

  if (!post) return { title: "İçerik Bulunamadı" };

  return {
    title: post.seoTitle || `${post.title} | Zirve Akbaş İnşaat`,
    description: post.seoDesc || post.summary,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const post = await db.post.findUnique({
    where: { slug }
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Post Header */}
      <section className="relative h-[50vh] md:h-[60vh] bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {post.image ? (
            <Image src={post.image} alt={post.title} fill className="object-cover opacity-40" priority />
          ) : (
            <div className="w-full h-full bg-zinc-900 opacity-50"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>
        
        <div className="absolute top-8 left-4 sm:left-8 z-20">
          <Link href="/haberler" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium bg-black/30 px-4 py-2 rounded-full backdrop-blur-md transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Tüm Haberlere Dön
          </Link>
        </div>

        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 text-center">
          <div className="mb-6 flex items-center justify-center gap-4 text-white/80">
            <Calendar className="w-5 h-5 text-[#E58C36]" />
            <span className="text-lg font-medium">{new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-16 md:py-24">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg md:prose-xl prose-zinc text-zinc-700 leading-relaxed max-w-none whitespace-pre-line">
            <p className="text-2xl text-zinc-500 font-medium leading-relaxed mb-12">
              {post.summary}
            </p>
            {post.content}
          </div>
          
          <div className="mt-20 pt-10 border-t border-zinc-200">
            <div className="bg-[#FAFAFA] p-8 md:p-12 rounded-3xl border border-zinc-100 text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900">Kentsel Dönüşüm Projeniz Mi Var?</h3>
              <p className="text-zinc-600 text-lg">Uzman ekibimizle ücretsiz keşif ve danışmanlık hizmetimizden yararlanın.</p>
              <div className="pt-4">
                <Link href="/iletisim" className="inline-block bg-[#E58C36] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-900 transition-colors shadow-lg shadow-[#E58C36]/30 hover:shadow-xl hover:shadow-zinc-900/20">
                  Bizimle İletişime Geçin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
