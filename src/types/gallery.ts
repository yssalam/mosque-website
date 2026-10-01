export type GallerySource = "ARTICLE" | "EVENT";

export type GalleryFormValues = {
  imageURL: string;
  caption: string;
  articleId: string;
  eventId: string;
};

export const defaultGalleryValues: GalleryFormValues = {
  imageURL: "",
  caption: "",
  articleId: "",
  eventId: "",
};

export type GalleryData = {
  id: string;
  imageURL: string;
  caption: string | null;
  articleId: string | null;
  eventId: string | null;
  createdAt: Date;
  updatedAt: Date;
};