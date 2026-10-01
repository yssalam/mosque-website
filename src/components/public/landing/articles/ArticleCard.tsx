import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  article: {
    slug: string;
    name: string;
    desc: string;
    imageURL: string;
    createdAt: Date;
  };
}

export default function ArticleCard({
  article,
}: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex gap-4 rounded-2xl bg-white p-3 shadow-sm transition hover:shadow-lg"
    >
      <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          src={article.imageURL}
          alt={article.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <p className="text-xs text-[#B8892D]">
            {article.createdAt.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          <h3 className="mt-2 line-clamp-2 font-heading text-xl font-semibold text-[#184D3B]">
            {article.name}
          </h3>
        </div>

        <p className="line-clamp-2 text-sm text-gray-600">
          {article.desc}
        </p>
      </div>
    </Link>
  );
}