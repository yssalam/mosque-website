import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import AnnouncementForm from "@/components/dashboard/layout/announcements/AnnouncementForm";
import { updateAnnouncement } from "@/actions/announcement";

interface EditAnnouncementPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAnnouncementPage({
  params,
}: EditAnnouncementPageProps) {
  const { id } = await params;

  const announcement = await prisma.announcement.findUnique({
    where: { id },
  });

  if (!announcement) notFound();

  const updateAnnouncementWithId = updateAnnouncement.bind(
    null,
    announcement.id,
  );

  return (
    <div className="space-y-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold text-gray-700">Edit Announcement</h1>

        <p className="text-gray-500">Perbarui informasi announcement.</p>
      </div>

      <AnnouncementForm
        isEdit
        initialValues={{
          title: announcement.title,
          content: announcement.content,
          status: announcement.status,
        }}
        initialImageURL={announcement.imageURL ?? undefined}
        onSubmit={updateAnnouncementWithId}
      />
    </div>
  );
}
