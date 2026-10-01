import { AnnouncementStatus } from "@/generated/prisma/client";

interface StatusBadgeProps {
  status: AnnouncementStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === "ACTIVE";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        isActive
          ? "bg-emerald-100 text-emerald-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
