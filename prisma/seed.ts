import "dotenv/config";

import { PrismaClient, EventStatus } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const events = [
    {
      title: "Kajian Tafsir Al-Kahfi",
      slug: "kajian-tafsir-al-kahfi",
      description:
        "Kajian rutin membahas tafsir Surat Al-Kahfi bersama ustadz dan jamaah Masjid.",
      imageURL:
        "https://images.unsplash.com/photo-1542816417-0983670c5e0f?auto=format&fit=crop&w=1200&q=80",
      speaker: "Ustadz Ahmad Fauzi",
      location: "Masjid Al-Hidayah",
      eventDate: new Date("2026-10-04T00:00:00+07:00"),
      startTime: "19:30",
      endTime: "21:00",
      status: EventStatus.PUBLISHED,
    },

    {
      title: "Kajian Fiqih Shalat",
      slug: "kajian-fiqih-shalat",
      description:
        "Kajian membahas dasar-dasar fiqih shalat, tata cara pelaksanaan, serta beberapa permasalahan yang sering ditemui dalam kehidupan sehari-hari.",
      imageURL:
        "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80",
      speaker: "Ustadz Muhammad Ridwan",
      location: "Aula Masjid Al-Hidayah",
      eventDate: new Date("2026-10-10T00:00:00+07:00"),
      startTime: "19:30",
      endTime: "21:00",
      status: EventStatus.PUBLISHED,
    },

    {
      title: "Tabligh Akbar Maulid Nabi",
      slug: "tabligh-akbar-maulid-nabi",
      description:
        "Tabligh akbar dalam rangka memperingati Maulid Nabi Muhammad SAW dengan tausiyah dan doa bersama.",
      imageURL:
        "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
      speaker: "Ustadz Abdul Rahman",
      location: "Halaman Utama Masjid Al-Hidayah",
      eventDate: new Date("2026-10-18T00:00:00+07:00"),
      startTime: "08:00",
      endTime: "11:00",
      status: EventStatus.PUBLISHED,
    },

    {
      title: "Santunan Anak Yatim",
      slug: "santunan-anak-yatim",
      description:
        "Kegiatan santunan dan silaturahmi bersama anak yatim sebagai bagian dari program sosial Masjid.",
      imageURL:
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
      speaker: null,
      location: "Aula Masjid Al-Hidayah",
      eventDate: new Date("2026-10-24T00:00:00+07:00"),
      startTime: "09:00",
      endTime: "11:30",
      status: EventStatus.PUBLISHED,
    },

    {
      title: "Kajian Keluarga Sakinah",
      slug: "kajian-keluarga-sakinah",
      description:
        "Kajian khusus keluarga membahas bagaimana membangun kehidupan rumah tangga yang harmonis berdasarkan nilai-nilai Islam.",
      imageURL:
        "https://images.unsplash.com/photo-1504159506876-f8338247a14a?auto=format&fit=crop&w=1200&q=80",
      speaker: "Ustadzah Aisyah Rahma",
      location: "Aula Masjid Al-Hidayah",
      eventDate: new Date("2026-11-01T00:00:00+07:00"),
      startTime: "08:30",
      endTime: "10:30",
      status: EventStatus.PUBLISHED,
    },

    {
      title: "Rapat Persiapan Kegiatan Masjid",
      slug: "rapat-persiapan-kegiatan-masjid",
      description:
        "Rapat internal pengurus untuk membahas persiapan dan koordinasi kegiatan Masjid bulan berikutnya.",
      imageURL: null,
      speaker: null,
      location: "Ruang Pengurus Masjid",
      eventDate: new Date("2026-11-05T00:00:00+07:00"),
      startTime: "19:30",
      endTime: "21:00",
      status: EventStatus.DRAFT,
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: {
        slug: event.slug,
      },

      update: {
        title: event.title,
        description: event.description,
        imageURL: event.imageURL,
        speaker: event.speaker,
        location: event.location,
        eventDate: event.eventDate,
        startTime: event.startTime,
        endTime: event.endTime,
        status: event.status,
      },

      create: event,
    });
  }

  console.log("✅ Event seed berhasil.");
}

main()
  .catch((error) => {
    console.error("❌ Seed gagal:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
