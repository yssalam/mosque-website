import { prisma } from "@/lib/prisma";
import { updateMosqueProfile } from "@/actions/mosque-profile";

import MosqueProfileForm from "@/components/dashboard/layout/profile/MosqueProfileForm";

export default async function MosqueProfilePage() {
  const profile = await prisma.mosqueProfile.findFirst();

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Mosque Profile
        </h1>

        <p className="text-gray-600">
          Kelola informasi profil masjid yang akan ditampilkan di website.
        </p>
      </div>

      {/* Form */}
      <MosqueProfileForm
        initialValues={{
          mosqueName: profile?.mosqueName ?? "",
          description: profile?.description ?? "",
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
        initialLogoURL={profile?.logoURL ?? ""}
        initialHeroImageURL={profile?.heroImageURL ?? ""}
        onSubmit={updateMosqueProfile}
      />
    </main>
  );
}
