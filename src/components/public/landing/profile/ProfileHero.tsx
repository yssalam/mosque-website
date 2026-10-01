"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

import { usePublicData } from "@/context/PublicProvider";

export default function ProfileHero() {
  const  mosqueProfile = usePublicData();

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="relative h-[420px] md:h-[520px] lg:h-[600px]">
        {mosqueProfile.heroImageURL ? (
          <Image
            src={mosqueProfile.heroImageURL}
            alt={mosqueProfile.mosqueName}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-emerald-800" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-5 pb-10 md:pb-14">
          <span className="inline-flex rounded-full border border-[#C69A49]/50 bg-[#C69A49]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#F4D98A]">
            Profil Masjid
          </span>

          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-tight text-white md:text-6xl">
            {mosqueProfile.mosqueName}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-white/80">
            <MapPin size={18} />
            <span>{mosqueProfile.address}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
