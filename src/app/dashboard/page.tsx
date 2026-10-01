import { Newspaper, Bell, CalendarDays, Image } from "lucide-react";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import StatCard from "@/components/dashboard/StatCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentArticles from "@/components/dashboard/RecentArticles";

export default async function DashboardPage() {
  const session = await requireAuth();

  const articleCount = await prisma.article.count();
  const announcementCount = await prisma.announcement.count();
  const eventCount = await prisma.event.count();
  const galleryCount = await prisma.gallery.count();

  const recentArticles = await prisma.article.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="rounded-3xl bg-emerald-700 p-6 text-white">
        <h1 className="text-3xl font-bold">Assalamu'alaikum, {session.name}</h1>

        <p className="mt-2 text-emerald-100">
          Selamat datang kembali di CMS Masjid.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Articles" value={articleCount} icon={Newspaper} />

        <StatCard title="Announcements" value={announcementCount} icon={Bell} />

        <StatCard title="Events" value={eventCount} icon={CalendarDays} />

        <StatCard title="Gallery" value={galleryCount} icon={Image} />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Articles */}
      <RecentArticles articles={recentArticles} />
    </div>
  );
}
