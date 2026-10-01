import { z } from "zod";
import { eventFormSchema } from "@/validations/event";

export type EventStatus = "DRAFT" | "PUBLISHED";

export type EventFormValues = z.infer<typeof eventFormSchema>;

export const defaultEventValues: EventFormValues = {
  title: "",
  description: "",
  imageURL: "",
  speaker: "",
  location: "",
  eventDate: "",
  startTime: "",
  endTime: "",
  status: "DRAFT",
};

export type EventData = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageURL: string | null;
  speaker: string | null;
  location: string | null;
  eventDate: Date;
  startTime: string;
  endTime: string | null;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
};