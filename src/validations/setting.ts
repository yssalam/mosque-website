import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),

  email: z.email("Email tidak valid"),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, "Password lama wajib diisi"),

    newPassword: z
      .string()
      .min(8, "Password baru minimal 8 karakter"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Konfirmasi password tidak sama.",
    path: ["confirmPassword"],
  });