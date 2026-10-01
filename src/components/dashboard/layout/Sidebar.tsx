"use client";

import Image from "next/image";

import SidebarItem from "./SidebarItem";
import SidebarLogout from "@/components/auth/LogoutButton";

interface SidebarProps {
  mosqueName: string;
  logoURL: string;
}

export default function Sidebar({
  mosqueName,
  logoURL,
}: SidebarProps) {
  return (
    <aside className="hidden lg:flex w-72 min-h-screen flex-col bg-emerald-800 p-5">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-amber-50">
          {logoURL ? (
            <Image
              src={logoURL}
              alt={mosqueName}
              width={48}
              height={48}
              className="h-full w-full object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-emerald-700 text-white">
              M
            </div>
          )}
        </div>

        <div>
          <h1 className="text-base font-bold text-white">{mosqueName}</h1>
          <p className="text-xs text-emerald-100">Dashboard</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="mb-4 space-y-2 border-t border-emerald-700 pt-4">
        <SidebarItem href="/dashboard" title="Dashboard" icon="dashboard" />
        <SidebarItem href="/dashboard/articles" title="Articles" icon="article" />
        <SidebarItem
          href="/dashboard/announcements"
          title="Announcements"
          icon="announcement"
        />
        <SidebarItem href="/dashboard/events" title="Events" icon="event" />
        <SidebarItem href="/dashboard/gallery" title="Gallery" icon="gallery" />
        <SidebarItem
          href="/dashboard/profile"
          title="Mosque Profile"
          icon="profile"
        />
        <SidebarItem
          href="/dashboard/settings"
          title="Settings"
          icon="settings"
        />
      </nav>

      <div className="border-t border-emerald-700 pt-4">
        <SidebarLogout />
      </div>
    </aside>
  );
}