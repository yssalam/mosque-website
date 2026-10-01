import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  UserRound,
} from "lucide-react";

import { getPublishedEventBySlug } from "@/lib/event";

interface EventDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;

  const event = await getPublishedEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      <section className="px-4 py-10 md:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Back */}
          <Link
            href="/events"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#184D3B] transition hover:text-[#B8892D]"
          >
            <ArrowLeft size={18} />
            Kembali ke Kajian & Agenda
          </Link>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            {event.imageURL && (
              <div className="relative aspect-[16/8] w-full">
                <Image
                  src={event.imageURL}
                  alt={event.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6 md:p-10">
              <h1 className="text-3xl font-bold leading-tight text-gray-800 md:text-4xl">
                {event.title}
              </h1>

              <div className="mt-6 grid gap-4 border-y border-gray-100 py-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Tanggal
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {formatDate(event.eventDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Waktu
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {event.startTime}
                      {event.endTime ? ` - ${event.endTime}` : ""}
                    </p>
                  </div>
                </div>

                {event.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        Lokasi
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-700">
                        {event.location}
                      </p>
                    </div>
                  </div>
                )}

                {event.speaker && (
                  <div className="flex items-start gap-3">
                    <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        Pembicara
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-700">
                        {event.speaker}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <article className="mt-8">
                <h2 className="mb-4 text-xl font-bold text-gray-800">
                  Tentang Event
                </h2>

                <div className="whitespace-pre-line text-sm leading-7 text-gray-600 md:text-base">
                  {event.description}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}