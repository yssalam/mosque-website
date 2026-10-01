import Link from "next/link";
import { Article } from "@/generated/prisma/client";

interface RecentArticlesProps {
  articles: Article[];
}

export default function RecentArticles({ articles }: RecentArticlesProps) {
  return (
    <div className="rounded-2xl bg-white text-gray-600 p-5 shadow-sm border border-gray-100">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Articles</h2>

        <Link
          href="/dashboard/articles"
          className="text-sm text-emerald-700 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {articles.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada artikel.</p>
        ) : (
          articles.map((article) => (
            <div
              key={article.id}
              className="flex items-center gap-4 rounded-xl border p-3"
            >
              <img
                src={article.imageURL}
                alt={article.name}
                className="h-14 w-14 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{article.name}</h3>

                <p className="text-sm text-gray-500 line-clamp-1">
                  {article.desc}
                </p>
              </div>

              <Link
                href={`/dashboard/articles/${article.id}/edit`}
                className="text-sm font-medium text-emerald-700 hover:underline"
              >
                Edit
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
