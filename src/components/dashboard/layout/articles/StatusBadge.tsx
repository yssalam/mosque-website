import { ArticleStatus } from "@/generated/prisma/client";

interface StatusBadgeProps {
  status: ArticleStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isPublished = status === "PUBLISHED";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        isPublished
          ? "bg-emerald-100 text-emerald-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}