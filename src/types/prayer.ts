export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface PrayerScheduleData {
  timings: PrayerTimes;
  hijriDate: string;
  gregorianDate: string;
}