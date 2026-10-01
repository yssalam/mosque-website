"use client";

import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { eventFormSchema } from "@/validations/event";
import {
  EventFormValues,
  defaultEventValues,
} from "@/types/event";

interface EventFormProps {
  initialValues?: EventFormValues;
  initialImageURL?: string;
  onSubmit: (values: EventFormValues) => Promise<any>;
  isEdit?: boolean;
}

export default function EventForm({
  initialValues = defaultEventValues,
  initialImageURL = "",
  onSubmit,
  isEdit = false,
}: EventFormProps) {
  const [pending, startTransition] = useTransition();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] =
    useState(initialImageURL);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validasi ukuran
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 5MB.");
      e.target.value = "";
      return;
    }

    // Validasi format
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Format gambar harus JPG, PNG, atau WEBP.",
      );
      e.target.value = "";
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const submitHandler = (values: EventFormValues) => {
    startTransition(async () => {
      let imageURL = initialImageURL;

      /**
       * Upload gambar jika user memilih
       * file baru.
       */
      if (imageFile) {
        const uploadData = new FormData();

        uploadData.append("file", imageFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await response.json();

        if (!response.ok || !uploadResult.success) {
          toast.error(
            uploadResult.message ||
              "Gagal mengupload gambar.",
          );
          return;
        }

        imageURL = uploadResult.imageURL;
      }

      /**
       * Saat create, gambar wajib ada.
       *
       * Saat edit, gambar lama boleh tetap digunakan.
       */
      if (!imageURL && !isEdit) {
        toast.error("Silakan pilih gambar event.");
        return;
      }

      const submitValues: EventFormValues = {
        ...values,
        imageURL,
      };

      const result = await onSubmit(submitValues);

      if (result?.success) {
        toast.success(result.message);
      } else {
        toast.error(
          result?.message || "Gagal menyimpan event.",
        );
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6 rounded-2xl bg-white p-5 shadow-sm border"
    >
      {/* Judul */}
      <div className="text-gray-700">
        <label className="mb-2 block text-sm font-medium">
          Event Title
        </label>

        <input
          {...register("title")}
          placeholder="Kajian Tafsir Al-Kahfi"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.title && (
          <p className="mt-2 text-sm text-red-600">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Deskripsi */}
      <div className="text-gray-700">
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          {...register("description")}
          rows={6}
          placeholder="Tulis isi event..."
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.description && (
          <p className="mt-2 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Date */}
      <div className="text-gray-700">
        <label className="mb-2 block text-sm font-medium">
          Date
        </label>

        <input
          type="date"
          {...register("eventDate")}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.eventDate && (
          <p className="mt-2 text-sm text-red-600">
            {errors.eventDate.message}
          </p>
        )}
      </div>

      {/* Start Time */}
      <div className="text-gray-700">
        <label className="mb-2 block text-sm font-medium">
          Start Time
        </label>

        <input
          type="time"
          {...register("startTime")}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.startTime && (
          <p className="mt-2 text-sm text-red-600">
            {errors.startTime.message}
          </p>
        )}
      </div>

      {/* End Time */}
      <div className="text-gray-700">
        <label className="mb-2 block text-sm font-medium">
          End Time
        </label>

        <input
          type="time"
          {...register("endTime")}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.endTime && (
          <p className="mt-2 text-sm text-red-600">
            {errors.endTime.message}
          </p>
        )}
      </div>

      {/* Speaker */}
      <div className="text-gray-700">
        <label className="mb-2 block text-sm font-medium">
          Speaker
        </label>

        <input
          type="text"
          {...register("speaker")}
          placeholder="Ustadz Ahmad Fauzi"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.speaker && (
          <p className="mt-2 text-sm text-red-600">
            {errors.speaker.message}
          </p>
        )}
      </div>

      {/* Location */}
      <div className="text-gray-700">
        <label className="mb-2 block text-sm font-medium">
          Location
        </label>

        <input
          type="text"
          {...register("location")}
          placeholder="Masjid Al-Hidayah Bandung"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.location && (
          <p className="mt-2 text-sm text-red-600">
            {errors.location.message}
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div className="text-gray-700">
        <label className="mb-2 block text-sm font-medium">
          Event Image
        </label>

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleImageChange}
          className="w-full rounded-xl border px-4 py-3"
        />

        <p className="mt-2 text-xs text-gray-500">
          JPG, PNG atau WEBP. Maksimal 5MB.
        </p>

        {/* Preview */}
        {imagePreview && (
          <div className="mt-4">
            <p className="mb-2 text-sm text-gray-500">
              Image Preview
            </p>

            <img
              src={imagePreview}
              alt="Preview"
              className="h-56 w-full rounded-xl object-cover border"
            />
          </div>
        )}
      </div>

      {/* Status */}
       <div className="text-gray-700">
        <label className="mb-2 block text-sm font-medium">
          Status
        </label>

        <select
          {...register("status")}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {pending
          ? "Saving..."
          : isEdit
            ? "Update Event"
            : "Save Event"}
      </button>
    </form>
  );
}