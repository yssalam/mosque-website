import { ArticleStatus } from "@/generated/prisma/client";

export interface ArticleFormValues {
  name: string;
  desc: string;
  status: ArticleStatus;
}

export const defaultArticleValues: ArticleFormValues = {
  name: "",
  desc: "",
  status: "DRAFT",
};