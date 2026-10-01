import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";

interface EventCardProps {
  event: {
    title: string;
    slug: string;
    description: string;
    imageURL: string | null;
    location: string | null;
    eventDate: Date;
    startTime: string;
    endTime: string | null;
  };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="group overflow-hidden rounded-[28px] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      
      <Link href={`/events/${event.slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          {event.imageURL ? (
            <Image
              src={event.imageURL}
              alt={event.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              Tidak ada gambar
            </div>
          )}
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h3 className="line-clamp-2 text-lg font-bold text-gray-800 transition group-hover:text-[#B8892D]">
              {event.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
              {event.description}
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-emerald-600" />
              <span>{formatDate(event.eventDate)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span>
                {event.startTime}
                {event.endTime ? ` - ${event.endTime}` : ""}
              </span>
            </div>

            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
