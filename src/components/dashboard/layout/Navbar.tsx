"use client";

import { Menu } from "lucide-react";

interface NavbarProps {
  name: string;
  onMenuClick: () => void;
}

export default function Navbar({
  name,
  onMenuClick,
}: NavbarProps) {
  return (
    <header className="flex items-center justify-between w-full rounded-2xl border bg-white px-4 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="text-black" size={22} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Dashboard
          </h2>

          <p className="text-sm text-gray-500">
            Welcome back, {name}
          </p>
        </div>
      </div>
    </header>
  );
}