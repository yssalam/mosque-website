import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FeaturedArticleCard from "./FeaturedArticleCard";
import ArticleCard from "./ArticleCard";

interface Article {
  id: string;
  name: string;
  slug: string;
  desc: string;
  imageURL: string;
  createdAt: Date;
}

interface ArticleSectionProps {
  articles: Article[];
}

export default function ArticleSection({ articles }: ArticleSectionProps) {
  if (!articles.length) return null;

  const [featured, ...others] = articles;

  return (
    <section className="bg-[#F8F5EF] pt-52 pb-8 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B8892D]">
              Artikel Islami
            </p>

            <h2 className="mt-2 font-heading text-4xl font-semibold text-[#184D3B]">
              Kajian & Artikel Terbaru
            </h2>
          </div>

          <Link
            href="/articles"
            className="hidden shrink-0 text-sm font-semibold hover:text-[#B8892D] sm:block"
          >
            Lihat Semua →
          </Link>
        </div>

        {/* Content */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <FeaturedArticleCard article={featured} />

          <div className="space-y-6">
            {others.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/articles"
            className="flex w-full items-center justify-center rounded-xl border border-[#184D3B] py-3 font-medium text-[#184D3B]"
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}
