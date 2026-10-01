interface ArticleContentProps {
  article: {
    desc: string;
  };
}

export default function ArticleContent({
  article,
}: ArticleContentProps) {
  return (
    <section className="py-16">
      <article className="prose prose-lg mx-auto max-w-3xl px-5 text-[#184D3B] prose-headings:font-heading prose-headings:text-[#184D3B] prose-p:text-gray-700 prose-p:leading-8">
        {article.desc
          .split("\n")
          .filter(Boolean)
          .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
      </article>
    </section>
  );
}