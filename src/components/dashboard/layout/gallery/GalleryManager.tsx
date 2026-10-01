"use client";

import Image from "next/image";
import {
  ImagePlus,
  Loader2,
  Trash2,
} from "lucide-react";
import {
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";

import {
  createGallery,
  deleteGallery,
} from "@/actions/gallery";

interface GalleryItem {
  id: string;
  imageURL: string;
  caption: string | null;
}

interface GalleryManagerProps {
  articleId?: string;
  eventId?: string;
  initialGallery: GalleryItem[];
}

export default function GalleryManager({
  articleId,
  eventId,
  initialGallery,
}: GalleryManagerProps) {
  const [gallery, setGallery] =
    useState<GalleryItem[]>(initialGallery);

  const [pending, startTransition] =
    useTransition();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Reset input supaya file yang sama bisa dipilih lagi
    event.target.value = "";

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 5MB.");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Format gambar harus JPG, PNG, atau WEBP.",
      );
      return;
    }

    // Pastikan hanya salah satu relationship
    if (!articleId && !eventId) {
      toast.error(
        "Gallery belum terhubung ke Article atau Event.",
      );
      return;
    }

    if (articleId && eventId) {
      toast.error(
        "Gallery tidak boleh terhubung ke Article dan Event sekaligus.",
      );
      return;
    }

    try {
      /*
       * 1. Upload file ke Supabase
       */
      const uploadData = new FormData();

      uploadData.append("file", file);
      uploadData.append("folder", "gallery");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadResult = await response.json();

      if (
        !response.ok ||
        !uploadResult.success
      ) {
        toast.error(
          uploadResult.message ||
            "Gagal mengupload gambar.",
        );

        return;
      }

      /*
       * 2. Simpan URL ke database
       */
      const values = {
        imageURL: uploadResult.imageURL,
        caption: "",
        articleId: articleId ?? "",
        eventId: eventId ?? "",
      };

      startTransition(async () => {
        const result =
          await createGallery(values);

        if (!result.success) {
          toast.error(
            result.message ||
              "Gagal menyimpan gallery.",
          );

          return;
        }

        if (result.gallery) {
          setGallery((current) => [
            result.gallery!,
            ...current,
          ]);
        }

        toast.success(
          "Foto berhasil ditambahkan.",
        );
      });
    } catch (error) {
      console.error(
        "GALLERY UPLOAD ERROR:",
        error,
      );

      toast.error(
        "Terjadi kesalahan saat mengupload gambar.",
      );
    }
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Hapus foto ini dari gallery?",
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result =
        await deleteGallery(id);

      if (!result.success) {
        toast.error(
          result.message ||
            "Gagal menghapus gallery.",
        );

        return;
      }

      setGallery((current) =>
        current.filter(
          (item) => item.id !== id,
        ),
      );

      toast.success(
        "Foto berhasil dihapus.",
      );
    });
  };

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Gallery
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Dokumentasi foto untuk konten ini.
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleUpload}
            disabled={pending}
          />

          <button
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <ImagePlus size={17} />
            )}

            Tambah Foto
          </button>
        </div>
      </div>

      {/* Empty */}
      {gallery.length === 0 ? (
        <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-5 text-center">
          <ImagePlus
            size={32}
            className="mb-3 text-gray-300"
          />

          <p className="text-sm font-medium text-gray-500">
            Belum ada foto
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Tambahkan dokumentasi untuk konten
            ini.
          </p>
        </div>
      ) : (
        /* Gallery Grid */
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border bg-gray-50"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.imageURL}
                  alt={
                    item.caption ||
                    "Gallery"
                  }
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  disabled={pending}
                  className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 text-white shadow-sm transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:opacity-0 sm:group-hover:opacity-100"
                  title="Hapus foto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}