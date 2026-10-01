"use client";

import Image from "next/image";
import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string;
  imageURL: string;
  caption: string | null;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex, onClose, onPrevious, onNext]);

  if (activeIndex === null || !items[activeIndex]) {
    return null;
  }

  const item = items[activeIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup gallery"
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
      >
        <X size={22} />
      </button>

      {/* Previous */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrevious();
          }}
          aria-label="Foto sebelumnya"
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-6"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Image */}
      <div
        className="relative flex max-h-[90vh] max-w-6xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-[65vh] w-[85vw] sm:h-[75vh] sm:w-[80vw] lg:w-[70vw]">
          <Image
            src={item.imageURL}
            alt={item.caption || "Gallery Masjid"}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>

        {item.caption && (
          <div className="mt-4 max-w-2xl text-center">
            <p className="text-sm text-white/90">{item.caption}</p>
          </div>
        )}

        {items.length > 1 && (
          <p className="mt-2 text-xs text-white/50">
            {activeIndex + 1} / {items.length}
          </p>
        )}
      </div>

      {/* Next */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          aria-label="Foto berikutnya"
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-6"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}