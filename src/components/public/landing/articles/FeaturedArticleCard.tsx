import Image from "next/image";
import Link from "next/link";

interface FeaturedArticleProps {
  article: {
    slug: string;
    name: string;
    desc: string;
    imageURL: string;
    createdAt: Date;
  };
}

export default function FeaturedArticleCard({
  article,
}: FeaturedArticleProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group overflow-hidden rounded-[32px] bg-white shadow-sm transition hover:shadow-xl"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={article.imageURL}
          alt={article.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-7">
        <p className="text-sm text-[#B8892D]">
          {article.createdAt.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <h3 className="mt-3 font-heading text-3xl font-semibold text-[#184D3B] group-hover:text-[#B8892D]">
          {article.name}
        </h3>

        <p className="mt-4 line-clamp-3 text-gray-600">
          {article.desc}
        </p>

        <span className="mt-6 inline-flex text-sm font-semibold text-[#184D3B]">
          Baca Selengkapnya →
        </span>
      </div>
    </Link>
  );
}