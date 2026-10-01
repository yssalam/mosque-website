"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { eventFormSchema } from "@/validations/event";
import { generateSlug } from "@/lib/slug";
import { deleteStorageFiles } from "@/lib/storage";
import { isAuthenticated } from "@/lib/session";

function parseEventDate(date: string) {
  return new Date(`${date}T00:00:00+07:00`);
}

function normalizeOptional(value?: string) {
  return value?.trim() ? value.trim() : null;
}

/**
 * CREATE EVENT
 */
export async function createEvent(values: unknown) {
  const parsed = eventFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Data event tidak valid.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    const slug = generateSlug(data.title);

    const existingEvent = await prisma.event.findUnique({
      where: { slug },
    });

    if (existingEvent) {
      return {
        success: false,
        message: "Event dengan judul tersebut sudah ada.",
      };
    }

    await prisma.event.create({
      data: {
        title: data.title.trim(),
        slug,
        description: data.description.trim(),
        imageURL: normalizeOptional(data.imageURL),
        speaker: normalizeOptional(data.speaker),
        location: normalizeOptional(data.location),
        eventDate: parseEventDate(data.eventDate),
        startTime: data.startTime,
        endTime: normalizeOptional(data.endTime),
        status: data.status,
      },
    });

    // revalidatePath hanya mengenali path, query string diabaikan
    revalidatePath("/dashboard/events");

    return {
      success: true,
      message: "Event berhasil dibuat.",
    };
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);

    return {
      success: false,
      message: "Gagal membuat event.",
    };
  }
}

/**
 * UPDATE EVENT
 */
export async function updateEvent(id: string, values: unknown) {
  const parsed = eventFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Data event tidak valid.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return {
        success: false,
        message: "Event tidak ditemukan.",
      };
    }

    const slug = generateSlug(data.title);

    const slugOwner = await prisma.event.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    });

    if (slugOwner) {
      return {
        success: false,
        message: "Judul event tersebut sudah digunakan.",
      };
    }

    const newImageURL = normalizeOptional(data.imageURL);

    await prisma.event.update({
      where: { id },
      data: {
        title: data.title.trim(),
        slug,
        description: data.description.trim(),
        imageURL: newImageURL,
        speaker: normalizeOptional(data.speaker),
        location: normalizeOptional(data.location),
        eventDate: parseEventDate(data.eventDate),
        startTime: data.startTime,
        endTime: normalizeOptional(data.endTime),
        status: data.status,
      },
    });

    // Gambar berubah atau dihapus: bersihkan file lama dari storage
    if (existingEvent.imageURL && existingEvent.imageURL !== newImageURL) {
      await deleteStorageFiles([existingEvent.imageURL]);
    }

    revalidatePath("/dashboard/events");
    revalidatePath(`/dashboard/events/edit/${id}`);

    return {
      success: true,
      message: "Event berhasil diperbarui.",
    };
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);

    return {
      success: false,
      message: "Gagal memperbarui event.",
    };
  }
}

/**
 * DELETE EVENT
 * Menghapus event, semua gallery miliknya, dan file-nya di storage.
 */
export async function deleteEvent(id: string) {
  if (!(await isAuthenticated())) {
    return { success: false, message: "Tidak diizinkan." };
  }
  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      title: true,
      imageURL: true,
    },
  });

  if (!event) {
    return {
      success: false,
      message: "Event tidak ditemukan.",
    };
  }

  // Ambil URL gallery sebelum record-nya dihapus
  const galleries = await prisma.gallery.findMany({
    where: { eventId: id },
    select: { imageURL: true },
  });

  try {
    await prisma.$transaction([
      prisma.gallery.deleteMany({ where: { eventId: id } }),
      prisma.event.delete({ where: { id } }),
    ]);
  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);

    return {
      success: false,
      message: "Gagal menghapus event.",
    };
  }

  // Database sudah bersih, baru hapus file di storage.
  // Kegagalan di sini hanya menyisakan file yatim dan sudah tercatat di log.
  await deleteStorageFiles([
    event.imageURL,
    ...galleries.map((g) => g.imageURL),
  ]);

  revalidatePath("/dashboard/events");
  revalidatePath("/dashboard/gallery");

  // redirect harus di luar try/catch karena bekerja dengan melempar error
  redirect(`/dashboard/events?deleted=${encodeURIComponent(event.title)}`);
}