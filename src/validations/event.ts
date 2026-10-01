import { z } from "zod";

export const eventFormSchema = z.object({
  title: z
    .string()
    .min(5, "Judul minimal 5 karakter")
    .max(150, "Judul maksimal 150 karakter"),

  description: z
    .string()
    .min(20, "Deskripsi minimal 20 karakter"),

  imageURL: z
    .string()
    .url("URL gambar tidak valid")
    .optional()
    .or(z.literal("")),

  speaker: z
    .string()
    .max(100, "Nama pembicara maksimal 100 karakter")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .max(150, "Lokasi maksimal 150 karakter")
    .optional()
    .or(z.literal("")),

  eventDate: z
    .string()
    .min(1, "Tanggal event wajib diisi"),

  startTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Format waktu harus HH:mm",
    ),

  endTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Format waktu harus HH:mm",
    )
    .optional()
    .or(z.literal("")),

  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type EventFormSchema = z.infer<typeof eventFormSchema>;