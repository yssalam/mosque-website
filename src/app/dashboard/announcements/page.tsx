import Link from "next/link";
import { prisma } from "@/lib/prisma";

import SearchBar from "@/components/dashboard/layout/announcements/SearchBar";
import StatusBadge from "@/components/dashboard/layout/announcements/StatusBadge";
import Pagination from "@/components/dashboard/layout/announcements/Pagination";
import DeleteAnnouncementButton from "@/components/dashboard/layout/announcements/DeleteAnnouncementButton";

interface AnnouncementsPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

const PER_PAGE = 10;

export default async function AnnouncementsPage({
  searchParams,
}: AnnouncementsPageProps) {
  const { search = "", page = "1" } = await searchParams;

  const currentPage = Number(page);

  const where = search
    ? {
        title: {
          contains: search,
          mode: "insensitive" as const,
        },
      }
    : {};

  const totalAnnouncements = await prisma.announcement.count({ where });

  const totalPages = Math.max(1, Math.ceil(totalAnnouncements / PER_PAGE));

  const announcements = await prisma.announcement.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip: (currentPage - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex flex-col gap-4 px-2.5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Announcements</h1>

          <p className="text-gray-700">Kelola announcement website masjid.</p>
        </div>

        <Link
          href="/dashboard/announcements/create"
          className="rounded-xl bg-emerald-600 px-4 py-3 text-center text-white hover:bg-emerald-700"
        >
          Create Announcement
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
              <th className="p-4">Announcement</th>
              <th className="p-4">Content</th>
              <th className="p-4">Image</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {announcements.map((announcement, index) => (
              <tr key={announcement.id} className="border-t  hover:bg-gray-50">
                <td className="p-4 text-gray-600">
                  {(currentPage - 1) * PER_PAGE + index + 1}
                </td>

                <td className="p-4 text-gray-600">
                  <div>
                    <p className="font-medium">{announcement.title}</p>
                  </div>
                </td>
                <td className="p-4 text-gray-600">
                  <div>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {announcement.content}
                    </p>
                  </div>
                </td>

                <td className="p-4 text-gray-600">
                  <div className="flex items-center gap-3">
                    <img
                      src={announcement.imageURL ?? undefined}
                      alt={announcement.title}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </div>
                </td>

                <td className="p-4">
                  <StatusBadge status={announcement.status} />
                </td>

                <td className="p-4 text-sm text-gray-500">
                  {announcement.createdAt.toLocaleDateString("id-ID")}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/announcements/${announcement.id}/edit`}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <DeleteAnnouncementButton
                      id={announcement.id}
                      title={announcement.title}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {announcements.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Annoucement tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination page={currentPage} totalPages={totalPages} search={search} />
    </div>
  );
}
