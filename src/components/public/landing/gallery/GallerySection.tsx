import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";

import { getPublishedGallery } from "@/lib/gallery";
import GalleryGrid from "./GalleryGrid";

interface GallerySectionProps {
  limit?: number;
}

export default async function GallerySection({
  limit = 8,
}: GallerySectionProps) {
  const gallery = await getPublishedGallery();

  const displayedGallery = gallery.slice(0, limit);

  return (
    <section className="bg-[#F8F5EE] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#B8892D]">
              <Images size={17} />
              <span>Dokumentasi</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#184D3B] sm:text-3xl lg:text-4xl">
              Galeri Kegiatan
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
              Dokumentasi kegiatan, kajian, dan aktivitas Masjid.
            </p>
          </div>

          {gallery.length > limit && (
            <Link
              href="/gallery"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#184D3B] transition hover:text-[#B8892D]"
            >
              Lihat Semua
              <ArrowRight size={17} />
            </Link>
          )}
        </div>

        {/* Gallery */}
        <GalleryGrid items={displayedGallery} />
      </div>
    </section>
  );
}
