import ArticleForm from "@/components/dashboard/layout/articles/ArticleForm";
import { createArticle } from "@/actions/article";

export default function CreateArticlePage() {
  return (
    <div className="space-y-6">
      <div className="px-2.5">
        <h1 className="text-2xl font-bold text-gray-700">Create Article</h1>

        <p className="text-gray-500">
          Tambahkan artikel baru ke website masjid.
        </p>
      </div>

      <ArticleForm onSubmit={createArticle} />
    </div>
  );
}
