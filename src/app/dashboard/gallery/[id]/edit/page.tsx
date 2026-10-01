import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import GalleryForm from "@/components/dashboard/layout/gallery/GalleryForm";
import { updateGallery } from "@/actions/gallery";

interface EditGalleryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditGalleryPage({
  params,
}: EditGalleryPageProps) {
  const { id } = await params;

  const gallery = await prisma.gallery.findUnique({
    where: { id },
  });

  if (!gallery) notFound();

  const updateGalleryWithId = updateGallery.bind(null, gallery.id);

  return (
    <div className="space-y-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold text-gray-700">Edit Gallery</h1>

        <p className="text-gray-500">Perbarui informasi Gallery.</p>
      </div>

      <GalleryForm
        isEdit
        initialValues={{
          title: gallery.title,
        }}
        initialImageURL={gallery.imageURL}
        onSubmit={updateGalleryWithId}
      />
    </div>
  );
}
