"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;
  
  if (!title || !slug || !summary || !content) {
    return { error: "Gerekli tüm alanları doldurun." };
  }

  try {
    await db.post.create({
      data: {
        title,
        slug,
        summary,
        content,
        image: image || null,
        published: true,
      },
    });
    
    revalidatePath("/haberler");
    revalidatePath("/admin/haberler");
  } catch (error) {
    return { error: "İçerik eklenirken bir hata oluştu." };
  }
  
  redirect("/admin/haberler");
}

export async function deletePost(id: string) {
  try {
    await db.post.delete({
      where: { id },
    });
    revalidatePath("/haberler");
    revalidatePath("/admin/haberler");
    return { success: true };
  } catch (error) {
    return { error: "Silinirken hata oluştu." };
  }
}
