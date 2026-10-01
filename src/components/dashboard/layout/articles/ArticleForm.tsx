"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { articleFormSchema } from "@/validations/article";
import { ArticleFormValues, defaultArticleValues } from "@/types/article";

interface ArticleFormProps {
  initialValues?: ArticleFormValues;
  initialImageURL?: string;
  onSubmit: (formData: FormData) => Promise<any>;
  isEdit?: boolean;
}

export default function ArticleForm({
  initialValues = defaultArticleValues,
  initialImageURL = "",
  onSubmit,
  isEdit = false,
}: ArticleFormProps) {
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: initialValues,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initialImageURL);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const submitHandler = (values: ArticleFormValues) => {
    startTransition(async () => {
      let imageURL = initialImageURL;

      // Upload gambar jika memilih file baru
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await response.json();

        if (!uploadResult.success) {
          toast.error(uploadResult.message);
          return;
        }

        imageURL = uploadResult.imageURL;
      }

      // Jika create dan belum upload gambar
      if (!imageURL) {
        toast.error("Silakan pilih gambar artikel.");
        return;
      }

      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("desc", values.desc);
      formData.append("status", values.status);
      formData.append("imageURL", imageURL);

      const result = await onSubmit(formData);

      if (result?.success === false) {
        toast.error(result.message);
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
          Article Title
        </label>

        <input
          {...register("name")}
          placeholder="Kajian Tafsir Al-Kahfi"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.name && (
          <p className="mt-2 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Deskripsi */}
      <div className="text-gray-700">
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          {...register("desc")}
          rows={6}
          placeholder="Tulis isi artikel..."
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.desc && (
          <p className="mt-2 text-sm text-red-600">
            {errors.desc.message}
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div className="text-gray-700">
        <label className="mb-2 block text-sm font-medium">
          Article Image
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
            ? "Update Article"
            : "Save Article"}
      </button>
    </form>
  );
}