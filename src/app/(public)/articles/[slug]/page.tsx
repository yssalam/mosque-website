import { notFound } from "next/navigation";

import { getArticleBySlug, getRelatedArticles } from "@/lib/article";

import ArticleHero from "@/components/public/landing/articles/ArticleHero";
import ArticleContent from "@/components/public/landing/articles/ArticleContent";
import RelatedArticles from "@/components/public/landing/articles/RelatedArticles";

interface ArticleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(slug);

  return (
    <main className="bg-[#F8F5EF]">
      <ArticleHero article={article} />

      <ArticleContent article={article} />

      <RelatedArticles articles={relatedArticles} />
    </main>
  );
}
