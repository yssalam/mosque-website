import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getGalleryByEventId } from "@/lib/gallery";

import { updateEvent } from "@/actions/event";
import EventForm from "@/components/dashboard/layout/events/EventForm";
import GalleryManager from "@/components/dashboard/layout/gallery/GalleryManager";

interface EditEventPageProps {
  params: Promise<{
    id: string;
  }>;
}

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  if (!event) {
    notFound();
  }

  const updateEventWithId = updateEvent.bind(null, event.id);

  const gallery = await getGalleryByEventId(event.id);

  return (
    <div className="space-y-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold text-gray-700">Edit Event</h1>

        <p className="text-gray-500">Perbarui informasi event.</p>
      </div>

      <EventForm
        isEdit
        initialValues={{
          title: event.title,
          description: event.description,
          imageURL: event.imageURL ?? "",
          speaker: event.speaker ?? "",
          location: event.location ?? "",
          eventDate: formatEventDate(event.eventDate),
          startTime: event.startTime,
          endTime: event.endTime ?? "",
          status: event.status as "DRAFT" | "PUBLISHED",
        }}
        initialImageURL={event.imageURL ?? ""}
        onSubmit={updateEventWithId}
      />
      <GalleryManager eventId={event.id} initialGallery={gallery} />
    </div>
  );
}
