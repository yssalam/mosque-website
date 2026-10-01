import EventCard from "@/components/public/landing/events/EventCard";
import { getPublishedEvents } from "@/lib/event";

export default async function EventsPage() {
  const events = await getPublishedEvents();

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      <section className="bg-[#184D3B] py-28 text-white ">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#DCC48A]">
            Agenda Masjid
          </p>

          <h1 className="mt-4 font-heading text-5xl font-semibold md:text-6xl">
            Event & Kegiatan Masjid
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-emerald-100">
            Temukan berbagai kegiatan dan agenda yang akan diselenggarakan di
            masjid.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {events.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
              <p className="text-gray-500">
                Belum ada event yang dipublikasikan.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
