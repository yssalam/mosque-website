"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Newspaper,
  Bell,
  CalendarDays,
  ImageIcon,
  Building2,
  Settings,
} from "lucide-react";

const icons = {
  dashboard: LayoutDashboard,
  article: Newspaper,
  announcement: Bell,
  event: CalendarDays,
  gallery: ImageIcon,
  profile: Building2,
  settings: Settings,
};

interface SidebarItemProps {
  href: string;
  title: string;
  icon: keyof typeof icons;
}

export default function SidebarItem({
  href,
  title,
  icon,
}: SidebarItemProps) {
  const pathname = usePathname();

  const Icon = icons[icon];

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
        isActive
          ? "bg-emerald-700 text-white"
          : "text-emerald-100 hover:bg-emerald-700/50"
      }`}
    >
      <Icon size={20} />
      <span>{title}</span>
    </Link>
  );
}