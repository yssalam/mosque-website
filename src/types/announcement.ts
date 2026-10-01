import { AnnouncementStatus } from "@/generated/prisma/client";

export interface AnnouncementFormValues {
  title: string;
  content: string;
  status: AnnouncementStatus;
}

export const defaultAnnouncementValues: AnnouncementFormValues = {
  title: "",
  content: "",
  status: "ACTIVE",
};
