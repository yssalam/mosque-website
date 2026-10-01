"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  defaultValue: string;
}

export default function ArticleSearch({ defaultValue }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams(params.toString());

    if (search) {
      query.set("search", search);
    } else {
      query.delete("search");
    }

    query.delete("page");

    router.push(`/articles?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 flex items-center rounded-2xl border border-[#DDD5C8] bg-white px-5 py-4 shadow-sm"
    >
      <Search className="text-gray-400" size={20} />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari artikel..."
        className="ml-3 flex-1 bg-transparent outline-none placeholder:text-gray-400"
      />

      <button
        type="submit"
        className="rounded-xl bg-[#184D3B] px-5 py-2 text-sm font-medium text-white"
      >
        Cari
      </button>
    </form>
  );
}