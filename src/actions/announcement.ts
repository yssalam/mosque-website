"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { announcementFormSchema, announcementSchema } from "@/validations/announcement";
import { generateSlug } from "@/lib/slug";
import { supabase } from "@/lib/supabase";

export async function createAnnouncement(formData: FormData) {
  const values = {
    title: formData.get("title"),
    content: formData.get("content"),
    imageURL: formData.get("imageURL"),
    status: formData.get("status"),
  };

  const validated = announcementSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0].message,
    };
  }

  const data = validated.data;

  await prisma.announcement.create({
    data: { ...data, slug: generateSlug(data.title) },
  });

  redirect(
    `/dashboard/announcements?created=${encodeURIComponent(data.title)}`,
  );
}

export async function updateAnnouncement(id: string, formData: FormData) {
  const values = {
    title: formData.get("title"),
    content: formData.get("content"),
    imageURL: formData.get("imageURL"),
    status: formData.get("status"),
  };

  const validated = announcementSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0].message,
    };
  }

  const data = validated.data;

  const oldAnnouncement = await prisma.announcement.findUnique({
    where: { id },
    select: { imageURL: true },
  });

  await prisma.announcement.update({
    where: { id },
    data: {
      ...data,
      slug: generateSlug(data.title),
    },
  });

  if (
    oldAnnouncement &&
    oldAnnouncement.imageURL &&
    oldAnnouncement.imageURL !== data.imageURL
  ) {
    const oldImagePath = oldAnnouncement.imageURL.split(
      "/storage/v1/object/public/articles/",
    )[1];

    if (oldImagePath) {
      await supabase.storage.from("articles").remove([oldImagePath]);
    }
  }

  redirect(
    `/dashboard/announcements?updated=${encodeURIComponent(data.title)}`,
  );
}

export async function deleteAnnouncement(id: string) {
  const announcement = await prisma.announcement.findUnique({
    where: { id },
    select: {
      title: true,
      imageURL: true,
    },
  });

  if (!announcement) return;

  const imagePath = announcement.imageURL.split(
    "/storage/v1/object/public/articles/",
  )[1];

  // imagePath = "articles/uuid.jpg"

  if (imagePath) {
    await supabase.storage.from("articles").remove([imagePath]);
  }

  await prisma.announcement.delete({
    where: { id },
  });

  redirect(
    `/dashboard/announcements?deleted=${encodeURIComponent(announcement.title)}`,
  );
}
