import { prisma } from "@/lib/prisma";

export async function getPublishedGallery() {
  return prisma.gallery.findMany({
    where: {
      OR: [
        {
          article: {
            status: "PUBLISHED",
          },
        },
        {
          event: {
            status: "PUBLISHED",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      article: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      event: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });
}

export async function getGalleryByArticleId(articleId: string) {
  return prisma.gallery.findMany({
    where: {
      articleId,
      article: {
        status: "PUBLISHED",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getGalleryByEventId(eventId: string) {
  return prisma.gallery.findMany({
    where: {
      eventId,
      event: {
        status: "PUBLISHED",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}