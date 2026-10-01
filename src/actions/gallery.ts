"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { deleteStorageFile } from "@/lib/storage";
import { galleryFormSchema } from "@/validations/gallery";

function normalizeOptional(value?: string) {
  return value?.trim() ? value.trim() : null;
}

export async function createGallery(values: unknown) {
  const parsed = galleryFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Data gallery tidak valid.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    // Pastikan Article benar-benar ada
    if (data.articleId) {
      const article = await prisma.article.findUnique({
        where: { id: data.articleId },
      });

      if (!article) {
        return {
          success: false,
          message: "Article tidak ditemukan.",
        };
      }
    }

    // Pastikan Event benar-benar ada
    if (data.eventId) {
      const event = await prisma.event.findUnique({
        where: { id: data.eventId },
      });

      if (!event) {
        return {
          success: false,
          message: "Event tidak ditemukan.",
        };
      }
    }

    const gallery = await prisma.gallery.create({
      data: {
        imageURL: data.imageURL,
        caption: normalizeOptional(data.caption),
        articleId: normalizeOptional(data.articleId),
        eventId: normalizeOptional(data.eventId),
      },
    });

    revalidatePath("/dashboard/gallery");

    if (data.articleId) {
      revalidatePath(`/dashboard/articles/${data.articleId}/edit`);
    }

    if (data.eventId) {
      revalidatePath(`/dashboard/events/${data.eventId}/edit`);
    }

    return {
      success: true,
      message: "Gallery berhasil ditambahkan.",
      gallery: {
        id: gallery.id,
        imageURL: gallery.imageURL,
        caption: gallery.caption,
      },
    };
  } catch (error) {
    console.error("CREATE GALLERY ERROR:", error);

    return {
      success: false,
      message: "Gagal menambahkan gallery.",
    };
  }
}

export async function deleteGallery(id: string) {
  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!gallery) {
      return {
        success: false,
        message: "Gallery tidak ditemukan.",
      };
    }

    // Hapus record dulu. Kalau gagal, gambar masih utuh.
    await prisma.gallery.delete({
      where: { id },
    });

    // Lalu hapus file di storage. Kegagalan hanya menyisakan
    // file yatim dan sudah tercatat di log.
    await deleteStorageFile(gallery.imageURL);

    revalidatePath("/dashboard/gallery");

    if (gallery.articleId) {
      revalidatePath(`/dashboard/articles/${gallery.articleId}/edit`);
    }

    if (gallery.eventId) {
      revalidatePath(`/dashboard/events/${gallery.eventId}/edit`);
    }

    return {
      success: true,
      message: "Gallery berhasil dihapus.",
    };
  } catch (error) {
    console.error("DELETE GALLERY ERROR:", error);

    return {
      success: false,
      message: "Gagal menghapus gallery.",
    };
  }
}