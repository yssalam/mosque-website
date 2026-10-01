"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { articleSchema } from "@/validations/article";
import { generateSlug } from "@/lib/slug";
import { deleteStorageFile, deleteStorageFiles } from "@/lib/storage";

export async function createArticle(formData: FormData) {
  const values = {
    name: formData.get("name"),
    desc: formData.get("desc"),
    imageURL: formData.get("imageURL"),
    status: formData.get("status"),
  };

  const validated = articleSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0].message,
    };
  }

  const data = validated.data;

  await prisma.article.create({
    data: {
      ...data,
      slug: generateSlug(data.name),
    },
  });

  revalidatePath("/dashboard/articles");

  redirect(`/dashboard/articles?created=${encodeURIComponent(data.name)}`);
}

export async function updateArticle(id: string, formData: FormData) {
  const values = {
    name: formData.get("name"),
    desc: formData.get("desc"),
    imageURL: formData.get("imageURL"),
    status: formData.get("status"),
  };

  const validated = articleSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0].message,
    };
  }

  const data = validated.data;

  // Ambil artikel lama
  const oldArticle = await prisma.article.findUnique({
    where: { id },
    select: { imageURL: true },
  });

  // Update database
  await prisma.article.update({
    where: { id },
    data: {
      ...data,
      slug: generateSlug(data.name),
    },
  });

  // Kalau gambar berubah, hapus gambar lama dari storage
  if (oldArticle?.imageURL && oldArticle.imageURL !== data.imageURL) {
    await deleteStorageFile(oldArticle.imageURL);
  }

  revalidatePath("/dashboard/articles");

  redirect(`/dashboard/articles?updated=${encodeURIComponent(data.name)}`);
}

/**
 * DELETE ARTICLE
 * Menghapus artikel, semua gallery miliknya, dan file-nya di storage.
 */
export async function deleteArticle(id: string) {
  const article = await prisma.article.findUnique({
    where: { id },
    select: {
      name: true,
      imageURL: true,
    },
  });

  if (!article) {
    return {
      success: false,
      message: "Artikel tidak ditemukan.",
    };
  }

  // Ambil URL gallery sebelum record-nya dihapus
  const galleries = await prisma.gallery.findMany({
    where: { articleId: id },
    select: { imageURL: true },
  });

  try {
    await prisma.$transaction([
      prisma.gallery.deleteMany({ where: { articleId: id } }),
      prisma.article.delete({ where: { id } }),
    ]);
  } catch (error) {
    console.error("DELETE ARTICLE ERROR:", error);

    return {
      success: false,
      message: "Gagal menghapus artikel.",
    };
  }

  await deleteStorageFiles([
    article.imageURL,
    ...galleries.map((g) => g.imageURL),
  ]);

  revalidatePath("/dashboard/articles");
  revalidatePath("/dashboard/gallery");

  // redirect harus di luar try/catch karena bekerja dengan melempar error
  redirect(`/dashboard/articles?deleted=${encodeURIComponent(article.name)}`);
}