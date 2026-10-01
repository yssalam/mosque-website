"use client";

import { LogOut } from "lucide-react";
import { useFormStatus } from "react-dom";

import { logoutAdmin } from "@/actions/auth";

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-100 transition hover:bg-red-700 hover:text-white disabled:opacity-50"
    >
      <LogOut size={20} />

      <span>{pending ? "Logging out..." : "Logout"}</span>
    </button>
  );
}

export default function SidebarLogout() {
  return (
    <form action={logoutAdmin}>
      <LogoutButton />
    </form>
  );
}