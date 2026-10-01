import { z } from "zod";
import { mosqueProfileFormSchema } from "@/validations/mosque-profile";

export type MosqueProfileFormValues = z.infer<typeof mosqueProfileFormSchema>;

export const defaultMosqueProfileValues: MosqueProfileFormValues = {
  mosqueName: "",
  description: "",

  address: "",
  latitude: undefined,
  longitude: undefined,

  phone: "",
  email: "",
  mapURL: "",

  shortHistory: "",
  vision: "",
  mission: "",
  operationalHours: "",
};

export interface MosqueProfileFormData {
  mosqueName: string;
  description: string;

  address: string;
  latitude?: number;
  longitude?: number;
  phone: string;
  email: string;
  mapURL: string;

  shortHistory: string;
  vision: string;
  mission: string;
  operationalHours: string;
}
