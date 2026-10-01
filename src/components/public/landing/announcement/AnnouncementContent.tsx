import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";

import type { getAnnouncementBySlug } from "@/lib/announcement";

type Announcement = NonNullable<
  Awaited<ReturnType<typeof getAnnouncementBySlug>>
>;

interface AnnouncementContentProps {
  announcement: Announcement;
}

export default function AnnouncementContent({
  announcement,
}: AnnouncementContentProps) {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-5">
        {/* Back Button */}
        <div>
          <Link
            href="/announcements"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#184D3B] transition hover:text-[#B8892D]"
          >
            <ArrowLeft size={18} />
            Kembali ke Pengumuman
          </Link>
        </div>

        {/* Badge */}
        <div className="mt-8 inline-flex rounded-full bg-[#C69A49] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Pengumuman
        </div>

        {/* Title */}
        <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-[#184D3B] md:text-5xl">
          {announcement.title}
        </h1>

        {/* Date */}
        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={16} />

          {announcement.publishedAt?.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        {/* Hero Image */}
        {announcement.imageURL && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[32px]">
            <Image
              src={announcement.imageURL}
              alt={announcement.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg mt-10 max-w-none text-gray-700 prose-headings:text-[#184D3B] prose-p:leading-8">
          {announcement.content
            .split("\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </article>
      </div>
    </section>
  );
}
