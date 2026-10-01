import ArticleCard from "./ArticleCard";

interface Props {
  articles: any[];
}

export default function ArticleGrid({ articles }: Props) {
  if (!articles.length) {
    return (
      <div className="rounded-3xl bg-white py-20 text-center shadow-sm">
        <h3 className="font-heading text-3xl text-[#184D3B]">
          Artikel Tidak Ditemukan
        </h3>

        <p className="mt-3 text-gray-500">
          Coba gunakan kata kunci yang berbeda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}