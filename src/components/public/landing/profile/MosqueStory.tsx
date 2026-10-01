"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { usePublicData } from "@/context/PublicProvider";

const features = [
  "Kajian rutin setiap pekan.",
  "Program Tahfidz & TPA.",
  "Penyaluran zakat, infak, dan sedekah.",
];

export default function MosqueStory() {
  const  mosqueProfile  = usePublicData();

  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
          {mosqueProfile.heroImageURL ? (
            <Image
              src={mosqueProfile.heroImageURL}
              alt={mosqueProfile.mosqueName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-emerald-100" />
          )}
        </div>

        {/* Content */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B8892D]">
            Tentang Masjid
          </p>

          <h2 className="mt-3 font-heading text-4xl font-semibold text-[#184D3B]">
            Lebih Dekat Dengan Masjid
          </h2>

          <p className="mt-6 whitespace-pre-line leading-8 text-gray-600">
            {mosqueProfile.shortHistory || mosqueProfile.description}
          </p>

          <div className="mt-8 space-y-4">
            {features.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 text-[#B8892D]" size={20} />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
