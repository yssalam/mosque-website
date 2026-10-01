import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  search: string;
}

export default function ArticlePagination({
  page,
  totalPages,
  search,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-3">
      <Link
        href={`/articles?page=${page - 1}&search=${search}`}
        className={`rounded-xl border p-3 ${
          page === 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-[#184D3B] hover:text-white"
        }`}
      >
        <ChevronLeft size={18} />
      </Link>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Link
          key={index}
          href={`/articles?page=${index + 1}&search=${search}`}
          className={`flex h-10 w-10 items-center justify-center rounded-xl font-medium ${
            page === index + 1
              ? "bg-[#184D3B] text-white"
              : "border hover:bg-[#184D3B] hover:text-white"
          }`}
        >
          {index + 1}
        </Link>
      ))}

      <Link
        href={`/articles?page=${page + 1}&search=${search}`}
        className={`rounded-xl border p-3 ${
          page === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-[#184D3B] hover:text-white"
        }`}
      >
        <ChevronRight size={18} />
      </Link>
    </div>
  );
}