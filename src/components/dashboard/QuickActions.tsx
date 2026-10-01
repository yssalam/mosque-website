import Link from "next/link";
import { PlusCircle, Newspaper, CalendarDays, Bell, Image } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="rounded-2xl bg-white text-gray-600 p-5 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Link
          href="/dashboard/articles/create"
          className="rounded-xl border p-4 hover:bg-emerald-50 transition"
        >
          <div className="flex items-center justify-between gap-2">
            <Newspaper className="text-emerald-600 mb-2" />
            <PlusCircle />
          </div>
          <p className="text-sm font-medium">New Article</p>
        </Link>

        <Link
          href="/dashboard/events/create"
          className="rounded-xl border p-4 hover:bg-emerald-50 transition"
        >
          <div className="flex items-center justify-between gap-2">
            <CalendarDays className="text-emerald-600 mb-2" />
            <PlusCircle />
          </div>

          <p className="text-sm font-medium">New Event</p>
        </Link>

        <Link
          href="/dashboard/announcements/create"
          className="rounded-xl border p-4 hover:bg-emerald-50 transition"
        >
          <div className="flex items-center justify-between gap-2">
            <Bell className="text-emerald-600 mb-2" />
            <PlusCircle />
          </div>

          <p className="text-sm font-medium">New Announcement</p>
        </Link>

        <Link
          href="/dashboard/gallery/create"
          className="rounded-xl border p-4 hover:bg-emerald-50 transition"
        >
          <div className="flex items-center justify-between gap-2">
            <Image className="text-emerald-600 mb-2" />
            <PlusCircle />
          </div>

          <p className="text-sm font-medium">New Gallery</p>
        </Link>
      </div>
    </div>
  );
}
