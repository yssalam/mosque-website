import { notFound } from "next/navigation";

import AnnouncementContent from "@/components/public/landing/announcement/AnnouncementContent";

import { getAnnouncementBySlug } from "@/lib/announcement";

interface AnnouncementDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AnnouncementDetailPage({
  params,
}: AnnouncementDetailPageProps) {
  const { slug } = await params;

  const announcement = await getAnnouncementBySlug(slug);

  if (!announcement) {
    notFound();
  }

  return (
    <main className="bg-[#F8F5EF] min-h-screen">
      <AnnouncementContent announcement={announcement} />
    </main>
  );
}