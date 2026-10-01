import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { getLatestAnnouncements } from "@/lib/announcement";

type Announcement = Awaited<
  ReturnType<typeof getLatestAnnouncements>
>[number];

interface AnnouncementCardProps {
  announcement: Announcement;
}

export default function AnnouncementCard({
  announcement,
}: AnnouncementCardProps) {
  return (
    <Link
      href={`/announcements/${announcement.slug}`}
      className="group overflow-hidden rounded-[28px] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-gray-100">
        {announcement.imageURL ? (
          <Image
            src={announcement.imageURL}
            alt={announcement.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#EEF7F3] text-[#184D3B]">
            Pengumuman
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-[#C69A49] px-3 py-1 text-xs font-semibold text-white">
          Pengumuman
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={16} />

          {announcement.publishedAt?.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        <h3 className="font-heading text-xl font-semibold text-[#184D3B] transition group-hover:text-[#B8892D]">
          {announcement.title}
        </h3>

        <p className="mt-3 line-clamp-3 leading-7 text-gray-600">
          {announcement.content}
        </p>

        <div className="mt-6 font-semibold text-[#184D3B] group-hover:text-[#B8892D]">
          Baca Selengkapnya →
        </div>
      </div>
    </Link>
  );
}