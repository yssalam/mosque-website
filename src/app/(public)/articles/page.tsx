import { getArticles } from "@/lib/article";

import ArticleGrid from "@/components/public/landing/articles/ArticleGrid";
import ArticleSearch from "@/components/public/landing/articles/ArticleSearch";
import ArticlePagination from "@/components/public/landing/articles/ArticlePagination";

interface ArticlesPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const { search = "", page = "1" } = await searchParams;

  const { articles, totalPages, currentPage } = await getArticles({
    search,
    page: Number(page),
  });

  return (
    <main className="bg-[#F8F5EF]">
      {/* Hero */}
      <section className="bg-[#184D3B] py-28 text-white ">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#DCC48A]">
            Artikel Islami
          </p>

          <h1 className="mt-4 font-heading text-5xl font-semibold md:text-6xl">
            Kajian & Artikel Masjid
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-emerald-100">
            Kumpulan artikel, kajian, dan informasi islami yang dipublikasikan
            oleh pengurus masjid.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <ArticleSearch defaultValue={search} />

        <ArticleGrid articles={articles} />

        <ArticlePagination
          page={currentPage}
          totalPages={totalPages}
          search={search}
        />
      </section>
    </main>
  );
}
