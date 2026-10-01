import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ArticleHeroProps {
  article: {
    name: string;
    imageURL: string;
    createdAt: Date;
  };
}

export default function ArticleHero({
  article,
}: ArticleHeroProps) {
  return (
    <section className="relative">
      <div className="relative h-[380px] overflow-hidden md:h-[520px]">
        <Image
          src={article.imageURL}
          alt={article.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-5xl px-5 pb-10 text-white">
          <Link
            href="/articles"
            className="mb-5 inline-flex items-center gap-2 text-sm text-white/90 hover:text-[#DCC48A]"
          >
            <ArrowLeft size={18} />
            Kembali ke Artikel
          </Link>

          <p className="text-sm uppercase tracking-[0.25em] text-[#DCC48A]">
            Artikel Islami
          </p>

          <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight md:text-6xl">
            {article.name}
          </h1>

          <p className="mt-4 text-sm text-white/80">
            Dipublikasikan pada{" "}
            {article.createdAt.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </section>
  );
}