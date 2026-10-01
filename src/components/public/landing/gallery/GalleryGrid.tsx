"use client";

import Image from "next/image";
import { useState } from "react";
import GalleryLightbox from "./GalleryLightbox";

interface GalleryItem {
  id: string;
  imageURL: string;
  caption: string | null;
}

interface GalleryGridProps {
  items: GalleryItem[];
  limit?: number;
}

export default function GalleryGrid({
  items,
  limit,
}: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const displayedItems = limit ? items.slice(0, limit) : items;

  if (displayedItems.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
        <p className="text-sm text-gray-500">
          Belum ada dokumentasi foto.
        </p>
      </div>
    );
  }

  const handlePrevious = () => {
    if (activeIndex === null) return;

    setActiveIndex((current) => {
      if (current === null) return null;

      return current === 0
        ? displayedItems.length - 1
        : current - 1;
    });
  };

  const handleNext = () => {
    if (activeIndex === null) return;

    setActiveIndex((current) => {
      if (current === null) return null;

      return current === displayedItems.length - 1
        ? 0
        : current + 1;
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {displayedItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 text-left"
          >
            <Image
              src={item.imageURL}
              alt={item.caption || "Gallery Masjid"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/25" />

            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8 transition duration-300 group-hover:translate-y-0">
                <p className="line-clamp-2 text-xs font-medium text-white">
                  {item.caption}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      <GalleryLightbox
        items={displayedItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}