"use client";

import Image from "next/image";
import { X } from "lucide-react";

import SidebarItem from "./SidebarItem";
import SidebarLogout from "@/components/auth/LogoutButton";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;

  mosqueName: string;
  logoURL: string;
}

export default function MobileSidebar({
  open,
  onClose,
  mosqueName,
  logoURL,
}: MobileSidebarProps) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-emerald-800 p-5 transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-6">
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

          <div className="flex-1">
            <h1 className="text-xs font-bold text-white">{mosqueName}</h1>
            <p className="text-xs text-emerald-100">Dashboard</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white hover:bg-emerald-700"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="mb-4 flex-1 space-y-2 border-t border-emerald-700 pt-4">
          <div onClick={onClose}>
            <SidebarItem href="/dashboard" title="Dashboard" icon="dashboard" />
          </div>

          <div onClick={onClose}>
            <SidebarItem
              href="/dashboard/articles"
              title="Articles"
              icon="article"
            />
          </div>

          <div onClick={onClose}>
            <SidebarItem
              href="/dashboard/announcements"
              title="Announcements"
              icon="announcement"
            />
          </div>

          <div onClick={onClose}>
            <SidebarItem href="/dashboard/events" title="Events" icon="event" />
          </div>

          <div onClick={onClose}>
            <SidebarItem
              href="/dashboard/gallery"
              title="Gallery"
              icon="gallery"
            />
          </div>

          <div onClick={onClose}>
            <SidebarItem
              href="/dashboard/profile"
              title="Mosque Profile"
              icon="profile"
            />
          </div>

          <div onClick={onClose}>
            <SidebarItem
              href="/dashboard/settings"
              title="Settings"
              icon="settings"
            />
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-emerald-700 pt-4">
          <SidebarLogout />
        </div>
      </aside>
    </>
  );
}