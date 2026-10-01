import GalleryForm from "@/components/dashboard/layout/gallery/GalleryForm";
import { createGallery } from "@/actions/gallery";

export default function CreateEventPage() {
  return (
    <div className="space-y-6">
      <div className="px-2.5">
        <h1 className="text-2xl font-bold text-gray-700">Create Event</h1>

        <p className="text-gray-500">Tambahkan event baru ke website masjid.</p>
      </div>

      <GalleryForm onSubmit={createGallery} />
    </div>
  );
}
