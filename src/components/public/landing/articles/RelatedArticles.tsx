import ArticleCard from "./ArticleCard";

interface RelatedArticlesProps {
  articles: any[];
}

export default function RelatedArticles({
  articles,
}: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <section className="border-t border-[#E8E1D5] bg-[#FFFCF8] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B8892D]">
            Artikel Lainnya
          </p>

          <h2 className="mt-2 font-heading text-4xl font-semibold text-[#184D3B]">
            Mungkin Anda Juga Suka
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </div>
    </section>
  );
}