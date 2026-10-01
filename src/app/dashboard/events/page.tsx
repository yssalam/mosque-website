import Link from "next/link";

import { prisma } from "@/lib/prisma";

import SearchBar from "@/components/dashboard/layout/events/SearchBar";
import Pagination from "@/components/dashboard/layout/events/Pagination";
import DeleteEventButton from "@/components/dashboard/layout/events/DeleteEventButton";
import StatusBadge from "@/components/dashboard/layout/events/StatusBadge";

interface EventsPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

const PER_PAGE = 10;

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { search = "", page = "1" } = await searchParams;

  const parsedPage = Number(page);

  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const trimmedSearch = search.trim();

  const where = trimmedSearch
    ? {
        title: {
          contains: trimmedSearch,
          mode: "insensitive" as const,
        },
      }
    : undefined;

  const totalEvent = await prisma.event.count({
    where,
  });

  const totalPages = Math.max(1, Math.ceil(totalEvent / PER_PAGE));

  const events = await prisma.event.findMany({
    where,

    orderBy: {
      createdAt: "desc",
    },

    skip: (currentPage - 1) * PER_PAGE,

    take: PER_PAGE,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 px-2.5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Events</h1>

          <p className="text-gray-700">Kelola event website masjid.</p>
        </div>

        <Link
          href="/dashboard/events/create"
          className="rounded-xl bg-emerald-600 px-4 py-3 text-center text-white hover:bg-emerald-700"
        >
          Create Event
        </Link>
      </div>

      {/* Search */}
      <SearchBar />

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-2xl border bg-white shadow-sm">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-4">No</th>
              <th className="p-4">Event</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4">Date</th>
              <th className="p-4">Location</th>
              <th className="p-4">Image</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event, index) => (
              <tr key={event.id} className="border-t hover:bg-gray-50">
                {/* No */}
                <td className="p-4 text-gray-600">
                  {(currentPage - 1) * PER_PAGE + index + 1}
                </td>

                {/* Event */}
                <td className="p-4 text-gray-600">
                  <div>
                    <p className="font-medium">{event.title}</p>
                  </div>
                </td>

                {/* Description */}
                <td className="p-4 text-gray-600">
                  <div>
                    <p className="line-clamp-1 text-xs text-gray-500">
                      {event.description}
                    </p>
                  </div>
                </td>

                {/* Date */}
                <td className="p-4 text-gray-600">
                  <div>
                    <p className="line-clamp-1 text-xs text-gray-500">
                      {event.eventDate.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </td>

                {/* Location */}
                <td className="p-4 text-gray-600">
                  <div>
                    <p className="line-clamp-1 text-xs text-gray-500">
                      {event.location || "-"}
                    </p>
                  </div>
                </td>

                {/* Image */}
                <td className="p-4 text-gray-600">
                  <div className="flex items-center gap-3">
                    {event.imageURL ? (
                      <img
                        src={event.imageURL}
                        alt={event.title}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                </td>

                <td className="p-4">
                  <StatusBadge status={event.status} />
                </td>

                {/* Created At */}
                <td className="p-4 text-sm text-gray-500">
                  {event.createdAt.toLocaleDateString("id-ID")}
                </td>

                {/* Action */}
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/events/${event.id}/edit`}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <DeleteEventButton id={event.id} title={event.title} />
                  </div>
                </td>
              </tr>
            ))}

            {events.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  Event tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        search={trimmedSearch}
      />
    </div>
  );
}
