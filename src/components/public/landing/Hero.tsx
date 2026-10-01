"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { usePublicData } from "@/context/PublicProvider";

export default function Hero() {
  const mosqueProfile = usePublicData();

  return (
    <section className="relative min-h-[700px] overflow-visible bg-[#0F5A43] lg:min-h-[90vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        {mosqueProfile.heroImageURL ? (
          <Image
            src={mosqueProfile.heroImageURL}
            alt={mosqueProfile.mosqueName}
            fill
            priority
            className="object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-[#0F5A43]" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#062E23]/90 via-[#062E23]/65 to-[#062E23]/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[700px] max-w-7xl items-start px-5 pt-24 pb-60 md:min-h-[760px] md:px-8 md:pt-28 md:pb-56 lg:min-h-[90vh] lg:items-center lg:pt-32 lg:pb-40">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Badge */}
          <span className="inline-flex rounded-full px-1 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F3D58E] md:text-xs">
            Portal Resmi Masjid
          </span>
          

          {/* Title */}
          <h1 className="mt-6 font-heading text-5xl font-semibold leading-[1.05] text-white md:text-6xl lg:text-7xl">
            {mosqueProfile.mosqueName}
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-8 text-white/85 md:text-lg">
            {mosqueProfile.description}
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/profile"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C69A49] px-6 py-4 text-sm font-semibold text-white transition duration-200 hover:bg-[#B8892D]"
            >
              Jelajahi Profil
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:bg-white/10"
            >
              <CalendarDays size={18} />
              Kajian & Agenda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}