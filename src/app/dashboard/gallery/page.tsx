import Image from "next/image";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";

import { prisma } from "@/lib/prisma";
import DeleteGalleryButton from "@/components/dashboard/layout/gallery/DeleteGalleryButton";

export default async function GalleryPage() {
  const galleries = await prisma.gallery.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      article: {
        select: {
          id: true,
          name: true,
        },
      },
      event: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-800">Gallery</h1>

        <p className="text-sm text-gray-500">
          Kelola dokumentasi foto dari Article dan Event.
        </p>
      </div>

      {/* Empty State */}
      {galleries.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 text-center shadow-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <ImageIcon size={26} className="text-gray-400" />
          </div>

          <h2 className="text-base font-semibold text-gray-700">
            Belum ada gallery
          </h2>

          <p className="mt-1 max-w-md text-sm text-gray-500">
            Foto gallery akan muncul di sini setelah ditambahkan melalui Article
            atau Event.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          {/* Counter */}
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Semua Foto
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {galleries.length} foto
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {galleries.map((gallery) => {
              const sourceType = gallery.article ? "Article" : "Event";

              const sourceName =
                gallery.article?.name ??
                gallery.event?.title ??
                "Tidak diketahui";

              const sourceHref = gallery.article
                ? `/dashboard/articles/${gallery.article.id}/edit`
                : gallery.event
                  ? `/dashboard/events/${gallery.event.id}/edit`
                  : "#";

              return (
                <div
                  key={gallery.id}
                  className="group overflow-hidden rounded-xl border bg-white"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={gallery.imageURL}
                      alt={gallery.caption || "Gallery"}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />

                    {/* Delete */}
                    <div className="absolute right-2 top-2">
                      <DeleteGalleryButton id={gallery.id} />
                    </div>
                  </div>

                  {/* Information */}
                  <div className="space-y-2 p-3">
                    {gallery.caption && (
                      <p className="line-clamp-2 text-sm font-medium text-gray-700">
                        {gallery.caption}
                      </p>
                    )}

                    <div>
                      <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                        {sourceType}
                      </span>

                      <Link
                        href={sourceHref}
                        className="mt-0.5 block truncate text-xs font-medium text-emerald-700 transition hover:text-emerald-900"
                      >
                        {sourceName}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
