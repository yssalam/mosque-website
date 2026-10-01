import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  search?: string;
}

export default function Pagination({
  page,
  totalPages,
  search,
}: PaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Link
        href={`/dashboard/articles?page=${page - 1}${search ? `&search=${search}` : ""}`}
        className={`rounded-lg border px-4 py-2 text-sm ${
          page <= 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        
        Previous
      </Link>

      <span className="text-sm text-gray-600 font-medium">
        Page {page} of {totalPages}
      </span>

      <Link
        href={`/dashboard/articles?page=${page + 1}${search ? `&search=${search}` : ""}`}
        className={`rounded-lg border px-4 py-2 text-sm ${
          page >= totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        Next
      </Link>
    </div>
  );
}