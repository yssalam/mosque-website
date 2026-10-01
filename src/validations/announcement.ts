import { z } from "zod";

// Untuk form (belum punya imageURL karena masih File)
export const announcementFormSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  content: z.string().min(20, "Deskripsi minimal 20 karakter"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const announcementSchema = announcementFormSchema.extend({
  imageURL: z.string().min(1, "Gambar wajib diupload")
})