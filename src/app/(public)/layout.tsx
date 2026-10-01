import type { Metadata } from "next";
import { getMosqueProfile } from "@/lib/mosque-profile";
import { PublicProvider } from "@/context/PublicProvider";

import Navbar from "@/components/public/navbar/Navbar";
import Footer from "@/components/public/footer/Footer";

export const metadata: Metadata = {
  title: "Website masjid",
  description: "Website masjid",
};

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getMosqueProfile();

  return (
    <PublicProvider
      value={{
        mosqueName: profile?.mosqueName ?? "",
        description: profile?.description ?? "",
        logoURL: profile?.logoURL ?? "",
        heroImageURL: profile?.heroImageURL ?? "",

        address: profile?.address ?? "",
        latitude: profile?.latitude ?? undefined,
        longitude: profile?.longitude ?? undefined,

        phone: profile?.phone ?? "",
        email: profile?.email ?? "",
        mapURL: profile?.mapURL ?? "",

        shortHistory: profile?.shortHistory ?? "",
        vision: profile?.vision ?? "",
        mission: profile?.mission ?? "",
        operationalHours: profile?.operationalHours ?? "",
      }}
    >
      <Navbar mosqueProfile={profile} />

      {children}

      <Footer />
    </PublicProvider>
  );
}
