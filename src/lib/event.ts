import { prisma } from "@/lib/prisma";

export async function getPublishedEvents() {
  return prisma.event.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      eventDate: "asc",
    },
  });
}

export async function getPublishedEventBySlug(slug: string) {
  return prisma.event.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
  });
}