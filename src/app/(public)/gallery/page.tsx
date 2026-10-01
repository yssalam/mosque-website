import type { Metadata } from "next";
import { Images } from "lucide-react";

import { getPublishedGallery } from "@/lib/gallery";
import GalleryGrid from "@/components/public/landing/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Galeri | Masjid",
  description:
    "Dokumentasi kegiatan, kajian, dan aktivitas Masjid.",
};

export default async function GalleryPage() {
  const gallery = await getPublishedGallery();

  return (
    <main className="min-h-screen bg-[#F8F5EE]">
      {/* Header */}

      <section className="bg-[#184D3B] py-28 text-white ">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#DCC48A]">
            Dokumentasi Masjid
          </p>

          <h1 className="mt-4 font-heading text-5xl font-semibold md:text-6xl">
            Galeri Kegiatan Masjid
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-emerald-100">
            Dokumentasi kegiatan, kajian, dan berbagai aktivitas
            yang berlangsung di Masjid.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 py-10 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl r">
          {gallery.length > 0 ? (
            <GalleryGrid items={gallery} />
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-20 text-center">
              <Images
                size={40}
                className="mx-auto mb-4 text-gray-300"
              />

              <h2 className="text-base font-semibold text-gray-700">
                Belum Ada Dokumentasi
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Dokumentasi kegiatan Masjid akan ditampilkan di sini.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}