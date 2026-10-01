"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { deleteGallery } from "@/actions/gallery";

interface DeleteGalleryButtonProps {
  id: string;
}

export default function DeleteGalleryButton({
  id,
}: DeleteGalleryButtonProps) {
  const [pending, startTransition] =
    useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Hapus foto ini dari gallery?",
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result = await deleteGallery(id);

      if (!result.success) {
        toast.error(
          result.message ||
            "Gagal menghapus gallery.",
        );

        return;
      }

      toast.success(
        "Foto berhasil dihapus.",
      );

      window.location.reload();
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      title="Hapus foto"
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/90 text-white shadow-sm backdrop-blur-sm transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? (
        <Loader2
          size={16}
          className="animate-spin"
        />
      ) : (
        <Trash2 size={16} />
      )}
    </button>
  );
}