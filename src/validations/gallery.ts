import { z } from "zod";

export const galleryFormSchema = z
  .object({
    imageURL: z
      .string()
      .url("URL gambar tidak valid"),

    caption: z
      .string()
      .max(255, "Caption maksimal 255 karakter")
      .optional()
      .or(z.literal("")),

    articleId: z
      .string()
      .optional()
      .or(z.literal("")),

    eventId: z
      .string()
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      const hasArticle = Boolean(data.articleId);
      const hasEvent = Boolean(data.eventId);

      return hasArticle !== hasEvent;
    },
    {
      message: "Gallery harus terhubung ke Article atau Event.",
      path: ["articleId"],
    },
  );

export type GalleryFormSchema = z.infer<typeof galleryFormSchema>;