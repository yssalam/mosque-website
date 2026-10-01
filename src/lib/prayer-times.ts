import { PrayerScheduleData } from "@/types/prayer";

export async function getPrayerSchedule(
  latitude: number,
  longitude: number,
): Promise<PrayerScheduleData> {
  const today = new Date();

  const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=11`,
    {
      next: {
        revalidate: 60 * 60,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch prayer schedule.");
  }

  const json = await response.json();

  return {
    timings: json.data.timings,
    hijriDate: json.data.date.hijri.date,
    gregorianDate: json.data.date.gregorian.date,
  };
}