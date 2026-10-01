import Link from "next/link";
import AnnouncementCard from "./AnnouncementCard";
import { getLatestAnnouncements } from "@/lib/announcement";

type Announcement = Awaited<
  ReturnType<typeof getLatestAnnouncements>
>[number];

interface AnnouncementSectionProps {
  announcements: Announcement[];
}

export default function AnnouncementSection({
  announcements,
}: AnnouncementSectionProps) {
  return (
    <section className="bg-[#F8F5EF] border-t py-5 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B8892D]">
              Pengumuman
            </p>

            <h2 className="mt-3 font-heading text-4xl font-semibold text-[#184D3B]">
              Informasi Terbaru Masjid
            </h2>

            <p className="mt-4 max-w-xl text-gray-600">
              Dapatkan informasi penting mengenai kegiatan, pengumuman,
              dan agenda terbaru Masjid.
            </p>
          </div>

          <Link
            href="/announcements"
            className="hidden text-sm font-semibold text-[#184D3B] hover:text-[#B8892D] md:block"
          >
            Lihat Semua →
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-10 md:hidden">
          <Link
            href="/announcements"
            className="flex justify-center rounded-xl border border-[#184D3B] px-6 py-3 font-semibold text-[#184D3B]"
          >
            Lihat Semua Pengumuman
          </Link>
        </div>
      </div>
    </section>
  );
}