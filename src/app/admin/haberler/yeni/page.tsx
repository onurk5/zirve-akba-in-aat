"use client";

import { useActionState } from "react";
import { createPost } from "@/app/actions/post-actions";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewPostPage() {
  const [state, formAction, isPending] = useActionState(createPost, undefined);
  const [title, setTitle] = useState("");

  const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/haberler" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-zinc-600" />
        </Link>
        <h1 className="text-3xl font-bold text-zinc-900">Yeni İçerik Ekle</h1>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Başlık</label>
              <input 
                name="title" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-[#E58C36] outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Slug (URL)</label>
              <input 
                name="slug" 
                required 
                value={generateSlug(title)}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 outline-none text-zinc-500" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900">Özet (Ana Sayfa/Liste Görünümü)</label>
            <textarea name="summary" required rows={2} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-[#E58C36] outline-none"></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900">İçerik (Makale)</label>
            <textarea name="content" required rows={10} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-[#E58C36] outline-none"></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900">Görsel URL (İsteğe Bağlı)</label>
            <input name="image" type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-[#E58C36] outline-none" placeholder="/ornek-gorsel.jpg" />
          </div>

          {state?.error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
              {state.error}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-[#E58C36] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-900 transition-colors shadow-lg disabled:opacity-70"
            >
              <Save className="w-5 h-5" />
              {isPending ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
