import { z } from "zod";

export const mosqueProfileFormSchema = z.object({
  
  mosqueName: z
    .string()
    .min(3, "Nama masjid minimal 3 karakter."),

  description: z
    .string()
    .min(20, "Deskripsi minimal 20 karakter."),

  // Contact
  address: z
    .string()
    .min(10, "Alamat minimal 10 karakter."),

  latitude: z.number().optional(),

  longitude: z.number().optional(),

  phone: z
    .string()
    .regex(/^[0-9+]+$/, "Nomor telepon hanya boleh berisi angka.")
    .min(10, "Nomor telepon minimal 10 digit."),

  email: z.email("Email tidak valid."),

  mapURL: z.url("Google Maps URL tidak valid."),

  // Profile Page
  shortHistory: z.string().optional(),

  vision: z.string().optional(),

  mission: z.string().optional(),

  operationalHours: z.string().optional(),

  // Upload URL
  logoURL: z.string().optional(),

  heroImageURL: z.string().optional(),
});