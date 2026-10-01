"use client";

import { useEffect, useMemo, useState } from "react";
import { PrayerScheduleData } from "@/types/prayer";
import { MapPinSearch, Clock } from "lucide-react";

interface PrayerScheduleProps {
  prayerSchedule: PrayerScheduleData;
}

export default function PrayerSchedule({
  prayerSchedule,
}: PrayerScheduleProps) {
  const [currentTime, setCurrentTime] = useState("");

  // Update jam setiap detik (timezone Bandung / Jakarta)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setCurrentTime(
        new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Jakarta",
        }).format(now),
      );
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  // Semua jadwal salat
  const prayers = useMemo(
    () => [
      { label: "Subuh", time: prayerSchedule.timings.Fajr },
      { label: "Syuruq", time: prayerSchedule.timings.Sunrise },
      { label: "Dzuhur", time: prayerSchedule.timings.Dhuhr },
      { label: "Ashar", time: prayerSchedule.timings.Asr },
      { label: "Maghrib", time: prayerSchedule.timings.Maghrib },
      { label: "Isya", time: prayerSchedule.timings.Isha },
    ],
    [prayerSchedule],
  );

  // Tentukan salat berikutnya berdasarkan jam Bandung
  const nextPrayer = useMemo(() => {
    const now = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
    );

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (const prayer of prayers) {
      const [hour, minute] = prayer.time.split(":").map(Number);
      const prayerMinutes = hour * 60 + minute;

      if (currentMinutes < prayerMinutes) {
        return prayer.label;
      }
    }

    // Kalau sudah lewat Isya → berikutnya Subuh besok
    return "Subuh";
  }, [prayers]);

  return (
    <section
      id="jadwal"
      className="absolute left-1/2 z-20 w-full max-w-6xl -translate-x-1/2 px-4
    -bottom-46
    md:-bottom-36
    lg:-bottom-24"
    >
      <div className="rounded-[28px] border border-[#D8CFC2] bg-[#F8F5EF] p-4 shadow-[0_15px_45px_rgba(0,0,0,0.12)] md:p-6 lg:flex lg:items-center lg:justify-between lg:gap-8">
        {/* Header */}
        <div className="mb-5 lg:mb-0 lg:min-w-[230px]">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B8892D]">
            <span className="flex items-center gap-2">
              <MapPinSearch /> Bandung, Jawa Barat
            </span>
          </p>
          <div className="flex flex-col justify-center items-center gap-2 ">
            <h2 className="mt-2 font-heading text-xl font-semibold text-[#184D3B] md:text-3xl">
              Jadwal Salat Hari Ini
            </h2>

            <p className="mt-1 text-xs text-[#184D3B]/70">
              {prayerSchedule.hijriDate} H / {prayerSchedule.gregorianDate}
            </p>

            {/* Jam Sekarang */}
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#184D3B] px-3 py-1">
              <Clock className="h-4 w-4 text-white" />

              <span className="text-sm font-medium text-white">
                {currentTime} WIB
              </span>
            </div>
          </div>
        </div>

        {/* Prayer Cards */}
        <div className="grid flex-1 grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
          {prayers.map((prayer) => {
            const isNext = prayer.label === nextPrayer;

            return (
              <div
                key={prayer.label}
                className={`rounded-xl border py-3 text-center transition-all ${
                  isNext
                    ? "border-[#184D3B] bg-[#184D3B] text-white shadow-lg"
                    : "border-[#D8CFC2] bg-[#FFFCF8] text-[#184D3B]"
                }`}
              >
                <p
                  className={`text-[11px] font-medium ${
                    isNext ? "text-[#DCC48A]" : "text-[#184D3B]/70"
                  }`}
                >
                  {prayer.label}
                </p>

                <p className="mt-1 font-heading text-xl font-semibold">
                  {prayer.time.slice(0, 5)}
                </p>

                {isNext && (
                  <span className="mt-2 inline-block rounded-md bg-[#C69A49] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#184D3B]">
                    Berikutnya
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
