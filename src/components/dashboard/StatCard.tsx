import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h3>
        </div>

        <div className="rounded-full bg-emerald-100 p-3">
          <Icon size={24} className="text-emerald-700" />
        </div>
      </div>
    </div>
  );
}