import Link from "next/link";
import EventCard from "./EventCard";

interface EventSectionProps {
  events: {
    id: string;
    title: string;
    slug: string;
    description: string;
    imageURL: string | null;
    location: string | null;
    eventDate: Date;
    startTime: string;
    endTime: string | null;
  }[];
}

export default function EventSection({ events }: EventSectionProps) {
  return (
    <section className="relative z-10 bg-white rounded-4xl shadow-[0_0_35px_rgba(0,0,0,0.25)] border border-gray-100 px-4 py-6 mt-6 md:py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl lg:px-5">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#B8892D]">
              Agenda
            </p>

            <h2 className="text-2xl font-bold text-[#184D3B] md:text-3xl">
              Event & Kegiatan
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
              Informasi kegiatan dan agenda terbaru di masjid.
            </p>
          </div>

          <Link
            href="/events"
            className="hidden shrink-0 text-sm font-semibold hover:text-[#B8892D] sm:block"
          >
            Lihat semua →
            
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">
            <p className="text-sm text-gray-500">
              Belum ada event yang dipublikasikan.
            </p>
          </div>
        )}

        <div className="mt-10 md:hidden">
          <Link
            href="/events"
            className="flex justify-center rounded-xl border border-[#184D3B] px-6 py-3 font-semibold text-[#184D3B]"
          >
            Lihat semua event →
          </Link>
        </div>
      </div>
    </section>
  );
}
