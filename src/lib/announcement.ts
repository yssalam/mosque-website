import { prisma } from "@/lib/prisma";
import { AnnouncementStatus } from "@/generated/prisma/enums";

export async function getLatestAnnouncements(limit = 3) {
  return prisma.announcement.findMany({
    where: {
      status: AnnouncementStatus.ACTIVE,
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: limit,
  });
}

export async function getAnnouncements() {
  return prisma.announcement.findMany({
    where: {
      status: AnnouncementStatus.ACTIVE,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
}
export async function getAnnouncementBySlug(slug: string) {
  return prisma.announcement.findFirst({
    where: {
      slug,
      status: AnnouncementStatus.ACTIVE,
    },
  });
}