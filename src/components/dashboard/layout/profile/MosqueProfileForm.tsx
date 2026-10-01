"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  MosqueProfileFormValues,
  defaultMosqueProfileValues,
} from "@/types/mosque-profile";

import { mosqueProfileFormSchema } from "@/validations/mosque-profile";

interface MosqueProfileFormProps {
  initialValues?: MosqueProfileFormValues;
  initialLogoURL?: string;
  initialHeroImageURL?: string;
  onSubmit: (formData: FormData) => Promise<any>;
}

export default function MosqueProfileForm({
  initialValues = defaultMosqueProfileValues,
  initialLogoURL = "",
  initialHeroImageURL = "",
  onSubmit,
}: MosqueProfileFormProps) {
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MosqueProfileFormValues>({
    resolver: zodResolver(mosqueProfileFormSchema),
    defaultValues: initialValues,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState(initialLogoURL);

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState(initialHeroImageURL);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setHeroFile(file);
    setHeroPreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file: File) => {
    const uploadData = new FormData();
    uploadData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: uploadData,
    });

    return response.json();
  };

  const submitHandler = (values: MosqueProfileFormValues) => {
    startTransition(async () => {
      let logoURL = initialLogoURL;
      let heroImageURL = initialHeroImageURL;

      // Upload Logo
      if (logoFile) {
        const result = await uploadImage(logoFile);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        logoURL = result.imageURL;
      }

      if (heroFile) {
        const result = await uploadImage(heroFile);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        heroImageURL = result.imageURL;
      }

      const formData = new FormData();

      formData.append("mosqueName", values.mosqueName);
      formData.append("description", values.description);

      formData.append("address", values.address);

      formData.append(
        "latitude",
        values.latitude !== undefined ? String(values.latitude) : "",
      );

      formData.append(
        "longitude",
        values.longitude !== undefined ? String(values.longitude) : "",
      );

      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("mapURL", values.mapURL);

      formData.append("shortHistory", values.shortHistory ?? "");
      formData.append("vision", values.vision ?? "");
      formData.append("mission", values.mission ?? "");
      formData.append("operationalHours", values.operationalHours ?? "");

      formData.append("logoURL", logoURL);
      formData.append("heroImageURL", heroImageURL);

      const result = await onSubmit(formData);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-8 rounded-3xl border bg-white p-6 shadow-sm"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-emerald-700">
            Basic Information
          </h2>

          <p className="text-sm text-gray-500">
            Informasi utama yang tampil di Landing Page dan Navbar.
          </p>
        </div>

        {/* Mosque Name */}
        <div>
          <label className="mb-2 block text-sm font-medium">Mosque Name</label>

          <input
            {...register("mosqueName")}
            placeholder="Masjid Al-Hidayah"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />

          {errors.mosqueName && (
            <p className="mt-2 text-sm text-red-600">
              {errors.mosqueName.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Short Description
          </label>

          <textarea
            {...register("description")}
            rows={5}
            placeholder="Deskripsi singkat masjid..."
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />

          {errors.description && (
            <p className="mt-2 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Logo */}
        <div>
          <label className="mb-2 block text-sm font-medium">Mosque Logo</label>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleLogoChange}
            className="w-full rounded-xl border px-4 py-3"
          />

          <p className="mt-2 text-xs text-gray-500">
            PNG / JPG / WEBP. Maksimal 5 MB.
          </p>

          {logoPreview && (
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="mt-4 h-28 w-28 rounded-xl border object-cover"
            />
          )}
        </div>

        {/* Hero Banner */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Hero Banner Image
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleHeroChange}
            className="w-full rounded-xl border px-4 py-3"
          />

          <p className="mt-2 text-xs text-gray-500">
            Rekomendasi ukuran 1600 × 900 px.
          </p>

          {heroPreview && (
            <img
              src={heroPreview}
              alt="Hero Preview"
              className="mt-4 aspect-[16/9] w-full rounded-xl border object-cover"
            />
          )}
        </div>
      </section>

      <hr />

      {/* ========================================================= */}
      {/* PROFILE PAGE CONTENT */}
      {/* ========================================================= */}

      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-emerald-700">
            Profile Page Content
          </h2>

          <p className="text-sm text-gray-500">
            Konten yang akan ditampilkan di halaman Profil Masjid.
          </p>
        </div>

        {/* History */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Short History
          </label>

          <textarea
            {...register("shortHistory")}
            rows={6}
            placeholder="Ceritakan sejarah berdirinya masjid..."
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        {/* Vision */}
        <div>
          <label className="mb-2 block text-sm font-medium">Vision</label>

          <textarea
            {...register("vision")}
            rows={4}
            placeholder="Tuliskan visi masjid..."
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        {/* Mission */}
        <div>
          <label className="mb-2 block text-sm font-medium">Mission</label>

          <textarea
            {...register("mission")}
            rows={5}
            placeholder="Tuliskan misi masjid..."
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        {/* Operational Hours */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Operational Hours
          </label>

          <input
            {...register("operationalHours")}
            placeholder="Setiap Hari • 04.00 - 21.30 WIB"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </section>

      <hr />

      {/* ========================================================= */}
      {/* CONTACT & LOCATION */}
      {/* ========================================================= */}

      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-emerald-700">
            Contact & Location
          </h2>

          <p className="text-sm text-gray-500">
            Informasi kontak dan koordinat lokasi masjid.
          </p>
        </div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm font-medium">Address</label>

          <textarea
            {...register("address")}
            rows={3}
            placeholder="Jl. Soekarno Hatta No.123 Bandung"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />

          {errors.address && (
            <p className="mt-2 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Latitude & Longitude */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Latitude</label>

            <input
              type="number"
              step="0.000001"
              {...register("latitude", { valueAsNumber: true })}
              placeholder="-6.914744"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />

            <p className="mt-1 text-xs text-gray-500">Contoh: -6.914744</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Longitude</label>

            <input
              type="number"
              step="0.000001"
              {...register("longitude", { valueAsNumber: true })}
              placeholder="107.609810"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />

            <p className="mt-1 text-xs text-gray-500">Contoh: 107.609810</p>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium">Phone</label>

          <input
            type="tel"
            inputMode="numeric"
            {...register("phone")}
            placeholder="081234567890"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(
                /[^0-9+]/g,
                "",
              );
            }}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />

          {errors.phone && (
            <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>

          <input
            type="email"
            {...register("email")}
            placeholder="info@masjid.com"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Maps */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Google Maps URL
          </label>

          <input
            type="url"
            {...register("mapURL")}
            placeholder="https://maps.google.com/..."
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />

          {errors.mapURL && (
            <p className="mt-2 text-sm text-red-600">{errors.mapURL.message}</p>
          )}
        </div>
      </section>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save Mosque Profile"}
      </button>
    </form>
  );
}
