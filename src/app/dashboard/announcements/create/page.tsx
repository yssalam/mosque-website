import AnnouncementForm from "@/components//dashboard/layout/announcements/AnnouncementForm";
import { createAnnouncement } from "@/actions/announcement";

export default function CreateAnnouncementPage() {
  return (
    <div className="space-y-6">
      <div className="px-2.5">
        <h1 className="text-2xl font-bold text-gray-700">
          Create Announcement
        </h1>

        <p className="text-gray-500">
          Tambahkan announcement baru ke website masjid.
        </p>
      </div>
      

      <AnnouncementForm onSubmit={createAnnouncement} />
    </div>
  );
}
