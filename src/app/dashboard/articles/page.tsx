import Link from "next/link";
import { prisma } from "@/lib/prisma";

import SearchBar from "@/components/dashboard/layout/articles/SearchBar";
import StatusBadge from "@/components/dashboard/layout/articles/StatusBadge";
import Pagination from "@/components/dashboard/layout/articles/Pagination";
import DeleteArticleButton from "@/components/dashboard/layout/articles/DeleteArticleButton";

interface ArticlesPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

const PER_PAGE = 10;

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const { search = "", page = "1" } = await searchParams;

  const currentPage = Number(page);

  const where = search
    ? {
        name: {
          contains: search,
          mode: "insensitive" as const,
        },
      }
    : {};

  const totalArticles = await prisma.article.count({ where });

  const totalPages = Math.max(1, Math.ceil(totalArticles / PER_PAGE));

  const articles = await prisma.article.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip: (currentPage - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex flex-col gap-4 px-2.5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Articles</h1>

          <p className="text-gray-700">Kelola artikel website masjid.</p>
        </div>

        <Link
          href="/dashboard/articles/create"
          className="rounded-xl bg-emerald-600 px-4 py-3 text-center text-white hover:bg-emerald-700"
        >
          Create Article
        </Link>
      </div>

      {/* Search */}
      <SearchBar />

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-2xl border bg-white shadow-sm">
        <table className="w-full min-w-[700px] w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-4">No</th>
              <th className="p-4">Article</th>
              <th className="p-4">Description</th>
              <th className="p-4">Image</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article, index) => (
              <tr key={article.id} className="border-t  hover:bg-gray-50">
                <td className="p-4 text-gray-600">
                  {(currentPage - 1) * PER_PAGE + index + 1}
                </td>

                <td className="p-4 text-gray-600">
                  <div>
                    <p className="font-medium">{article.name}</p>
                  </div>
                </td>
                <td className="p-4 text-gray-600">
                  <div>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {article.desc}
                    </p>
                  </div>
                </td>

                <td className="p-4 text-gray-600">
                  <div className="flex items-center gap-3">
                    <img
                      src={article.imageURL}
                      alt={article.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </div>
                </td>

                <td className="p-4">
                  <StatusBadge status={article.status} />
                </td>

                <td className="p-4 text-sm text-gray-500">
                  {article.createdAt.toLocaleDateString("id-ID")}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/articles/${article.id}/edit`}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <DeleteArticleButton id={article.id} name={article.name} />
                  </div>
                </td>
              </tr>
            ))}

            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Artikel tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination page={currentPage} totalPages={totalPages} search={search} />
    </div>
  );
}
