import { z } from "zod";

// Untuk form (belum punya imageURL karena masih File)
export const articleFormSchema = z.object({
  name: z.string().min(5, "Judul minimal 5 karakter"),
  desc: z.string().min(20, "Deskripsi minimal 20 karakter"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

// Untuk server/database (sudah punya imageURL hasil upload)
export const articleSchema = articleFormSchema.extend({
  imageURL: z.string().url("URL gambar tidak valid"),
});
