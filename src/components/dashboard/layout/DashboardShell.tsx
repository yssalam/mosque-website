"use client";

import { ReactNode, useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MobileSidebar from "./MobileSidebar";

interface DashboardShellProps {
  children: ReactNode;
  adminName: string;

  mosqueProfile: {
    mosqueName: string;
    logoURL: string;
  };
}

export default function DashboardShell({
  children,
  adminName,
  mosqueProfile,
}: DashboardShellProps) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <MobileSidebar
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        mosqueName={mosqueProfile.mosqueName}
        logoURL={mosqueProfile.logoURL}
      />

      <div className="flex">
        <Sidebar
          mosqueName={mosqueProfile.mosqueName}
          logoURL={mosqueProfile.logoURL}
        />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Navbar
            name={adminName}
            onMenuClick={() => setOpenSidebar(true)}
          />

          <section className="mt-6">{children}</section>
        </main>
      </div>
    </div>
  );
}