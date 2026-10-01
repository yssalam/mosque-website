"use client";

import { usePublicData } from "@/context/PublicProvider";

export default function VisionMission() {
  const mosqueProfile = usePublicData();

  return (
    <section className="bg-[#184D3B] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCC48A]">
            Visi & Misi
          </p>

          <h2 className="mt-3 font-heading text-4xl font-semibold text-white">
            Arah Perjalanan Masjid
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Vision */}
          <div className="rounded-[28px] bg-[#1F6651] p-8 text-white">
            <span className="text-sm uppercase tracking-[0.2em] text-[#DCC48A]">
              Visi
            </span>

            <p className="mt-5 text-lg leading-8">
              {mosqueProfile.vision ||
                "Menjadi pusat ibadah, pendidikan, dan pemberdayaan umat."}
            </p>
          </div>

          {/* Mission */}
          <div className="rounded-[28px] bg-[#FFFCF8] p-8">
            <span className="text-sm uppercase tracking-[0.2em] text-[#B8892D]">
              Misi
            </span>

            <p className="mt-5 whitespace-pre-line text-lg leading-8 text-[#184D3B]">
              {mosqueProfile.mission ||
                "Menyelenggarakan kajian, pendidikan Al-Qur'an, kegiatan sosial, dan mempererat ukhuwah Islamiyah."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
