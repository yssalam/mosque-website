import {
  BookOpen,
  Baby,
  Car,
  Users,
  Utensils,
  Wifi,
} from "lucide-react";

const facilities = [
  {
    icon: BookOpen,
    title: "Perpustakaan Islami",
    desc: "Ruang baca dengan koleksi buku Islam.",
  },
  {
    icon: Baby,
    title: "TPA & Tahfidz",
    desc: "Program pendidikan Al-Qur'an untuk anak-anak.",
  },
  {
    icon: Users,
    title: "Aula Serbaguna",
    desc: "Tempat kajian dan kegiatan masyarakat.",
  },
  {
    icon: Car,
    title: "Area Parkir",
    desc: "Parkir luas untuk jamaah.",
  },
  {
    icon: Wifi,
    title: "WiFi Masjid",
    desc: "Akses internet untuk kegiatan pendidikan.",
  },
  {
    icon: Utensils,
    title: "Dapur Umum",
    desc: "Mendukung kegiatan sosial dan buka puasa.",
  },
];

export default function FacilitiesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B8892D]">
            Fasilitas
          </p>

          <h2 className="mt-3 font-heading text-4xl font-semibold text-[#184D3B]">
            Fasilitas Masjid
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => {
            const Icon = facility.icon;

            return (
              <div
                key={facility.title}
                className="rounded-[28px] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex rounded-full bg-[#EEF7F3] p-4">
                  <Icon size={28} className="text-[#184D3B]" />
                </div>

                <h3 className="font-heading text-xl font-semibold text-[#184D3B]">
                  {facility.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {facility.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}