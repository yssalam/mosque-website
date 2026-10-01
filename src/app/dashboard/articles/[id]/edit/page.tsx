import { notFound } from "next/navigation";

import { updateArticle } from "@/actions/article";
import { prisma } from "@/lib/prisma";
import { getGalleryByArticleId } from "@/lib/gallery";
import ArticleForm from "@/components/dashboard/layout/articles/ArticleForm";
import GalleryManager from "@/components/dashboard/layout/gallery/GalleryManager";

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) notFound();

  const updateArticleWithId = updateArticle.bind(null, article.id);

  const gallery = await getGalleryByArticleId(article.id);

  return (
    <div className="space-y-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold text-gray-700">Edit Article</h1>

        <p className="text-gray-500">Perbarui informasi artikel.</p>
      </div>

      <ArticleForm
        isEdit
        initialValues={{
          name: article.name,
          desc: article.desc,
          status: article.status,
        }}
        initialImageURL={article.imageURL}
        onSubmit={updateArticleWithId}
      />
      <GalleryManager articleId={article.id} initialGallery={gallery} />
    </div>
  );
}
