import { ReactNode } from "react";

import DashboardShell from "@/components/dashboard/layout/DashboardShell";
import { requireAuth } from "@/lib/auth";
import { getMosqueProfile } from "@/lib/mosque-profile";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAuth();
  const profile = await getMosqueProfile();

  return (
    <DashboardShell
      adminName={session.name}
      mosqueProfile={{
        mosqueName: profile?.mosqueName ?? "Masjid Al-Munawwarah",
        logoURL: profile?.logoURL ?? "",
      }}
    >
      {children}
    </DashboardShell>
  );
}