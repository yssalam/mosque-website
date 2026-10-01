import Hero from "@/components/public/landing/Hero";
import PrayerSchedule from "@/components/public/landing/PrayerSchedule";
import ArticleSection from "@/components/public/landing/articles/ArticleSection";
import AnnouncementSection from "@/components/public/landing/announcement/AnnouncementSection";
import EventSection from "@/components/public/landing/events/EventSection";
import GallerySection from "@/components/public/landing/gallery/GallerySection";

import { getMosqueProfile } from "@/lib/mosque-profile";
import { getPrayerSchedule } from "@/lib/prayer-times";
import { getLatestArticles } from "@/lib/article";
import { getLatestAnnouncements } from "@/lib/announcement";
import { getPublishedEvents } from "@/lib/event";

export default async function HomePage() {
  const mosqueProfile = await getMosqueProfile();

  const prayerSchedule = await getPrayerSchedule(
    mosqueProfile?.latitude ?? -6.914744,
    mosqueProfile?.longitude ?? 107.60981,
  );

  const latestArticles = await getLatestArticles(3);
  const announcements = await getLatestAnnouncements(3);
  const events = await getPublishedEvents(3);

  return (
    <main>
      <Hero />
      <PrayerSchedule prayerSchedule={prayerSchedule} />
      <ArticleSection articles={latestArticles} />
      <AnnouncementSection announcements={announcements} />
      <EventSection events={events} />
      <GallerySection />
    </main>
  );
}
