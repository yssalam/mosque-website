import type { getAnnouncements } from "@/lib/announcement";
import AnnouncementCard from "./AnnouncementCard";

type Announcement = Awaited<ReturnType<typeof getAnnouncements>>[number];

interface AnnouncementGridProps {
  announcements: Announcement[];
}

export default function AnnouncementGrid({
  announcements,
}: AnnouncementGridProps) {
  if (announcements.length === 0) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-xl px-5 text-center">
          <h2 className="font-heading text-3xl text-[#184D3B]">
            Belum Ada Pengumuman
          </h2>

          <p className="mt-4 text-gray-600">
            Saat ini belum ada pengumuman yang dipublikasikan.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      </div>
    </section>
  );
}