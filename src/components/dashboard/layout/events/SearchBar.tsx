"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.replace(`/dashboard/events?${params.toString()}`);
  }

  return (
    <div className="relative w-full md:w-80">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      <input
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search event..."
        className="w-full rounded-xl border text-gray-600 border-gray-300 py-2 pl-10 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}