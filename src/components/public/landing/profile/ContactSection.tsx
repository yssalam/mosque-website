"use client";

import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { usePublicData } from "@/context/PublicProvider";

export default function ContactSection() {
  const mosqueProfile = usePublicData();
  const embedUrl = getMapEmbedUrl(mosqueProfile);

  function getMapEmbedUrl(p: {
    mapURL?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    address?: string | null;
  }) {
    // 1. Kalau admin menempel URL dari Share > Embed a map, pakai langsung
    if (p.mapURL?.includes("google.com/maps/embed")) return p.mapURL;

    // 2. Koordinat (paling akurat)
    if (p.latitude != null && p.longitude != null) {
      return `https://www.google.com/maps?q=${p.latitude},${p.longitude}&z=16&output=embed`;
    }

    // 3. Cadangan: cari lewat alamat
    if (p.address) {
      return `https://www.google.com/maps?q=${encodeURIComponent(p.address)}&z=16&output=embed`;
    }

    

    return null;
  }

  return (
    <section className="bg-[#FFFCF8] py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B8892D]">
            Kontak
          </p>

          <h2 className="mt-3 font-heading text-4xl font-semibold text-[#184D3B]">
            Hubungi Kami
          </h2>

          <div className="mt-8 space-y-6 text-[#184D3B]">
            <div className="flex gap-4">
              <MapPin className="text-[#B8892D]" />
              <span>{mosqueProfile.address}</span>
            </div>

            <div className="flex gap-4">
              <Phone className="text-[#B8892D]" />
              <span>{mosqueProfile.phone}</span>
            </div>

            <div className="flex gap-4">
              <Mail className="text-[#B8892D]" />
              <span>{mosqueProfile.email}</span>
            </div>

            <div className="flex gap-4">
              <Clock className="text-[#B8892D]" />
              <span>{mosqueProfile.operationalHours}</span>
            </div>
          </div>
        </div>

        {embedUrl && (
          <div className="overflow-hidden rounded-[28px] border">
            <iframe
              src={embedUrl}
              title={`Peta lokasi ${mosqueProfile.mosqueName}`}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>
        )}
      </div>
    </section>
  );
}
