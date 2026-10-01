"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import { usePublicData } from "@/context/PublicProvider";

interface MobileMenuProps {
  menus: {
    label: string;
    href: string;
  }[];
}

export default function MobileMenu({ menus }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const mosqueProfile = usePublicData();

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-[#184D3B] lg:hidden"
      >
        <Menu size={28} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed top-0 left-0 z-[998] h-screen w-screen bg-black/40 lg:hidden"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[999] flex h-screen w-72 flex-col bg-[#184D3B] p-5 transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-amber-50">
              {mosqueProfile.logoURL ? (
                <Image
                  src={mosqueProfile.logoURL}
                  alt={mosqueProfile.mosqueName}
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
              <h1 className="text-base font-bold text-white">
                {mosqueProfile.mosqueName}
              </h1>
              <p className="text-xs text-emerald-100">Portal Resmi Masjid</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-white transition hover:bg-emerald-700"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="mb-4 flex-1 space-y-2 border-t border-emerald-700 pt-4">
          {menus.map((menu) => (
            <div key={menu.href} onClick={() => setOpen(false)}>
              <Link
                href={menu.href}
                className="block rounded-xl px-4 py-3 text-emerald-100 transition hover:bg-emerald-700 hover:text-white"
              >
                {menu.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="border-t border-emerald-700 pt-4">
          <Link
            href="/donation"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-xl bg-[#C69A49] px-4 py-3 font-medium text-white transition hover:bg-[#B88C37]"
          >
            Infak & Sedekah
          </Link>
        </div>
      </aside>
    </>
  );
}
