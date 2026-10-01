import AnnouncementHero from "@/components/public/landing/announcement/AnnouncementHero";
import AnnouncementGrid from "@/components/public/landing/announcement/AnnouncementGrid";

import { getAnnouncements } from "@/lib/announcement";

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  const publishedAnnouncements = announcements.filter(
    (item) => item.status === "ACTIVE"
  );

  return (
    <main className="bg-[#F8F5EF] min-h-screen">
      <AnnouncementHero />

      <AnnouncementGrid announcements={publishedAnnouncements} />
    </main>
  );
}