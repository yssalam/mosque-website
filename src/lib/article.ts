import { prisma } from "@/lib/prisma";
import { ArticleStatus } from "@/generated/prisma/enums";

export async function getLatestArticles(limit = 3) {
  return prisma.article.findMany({
    where: {
      status: ArticleStatus.PUBLISHED,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}

export async function getAllPublishedArticles() {
  return prisma.article.findMany({
    where: {
      status: ArticleStatus.PUBLISHED,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: {
      slug,
      status: ArticleStatus.PUBLISHED,
    },
  });
}

const PER_PAGE = 9;

export async function getArticles({
  page = 1,
  search = "",
}: {
  page?: number;
  search?: string;
}) {
  const where = {
    status: ArticleStatus.PUBLISHED,
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive" as const,
      },
    }),
  };

  const total = await prisma.article.count({ where });

  const articles = await prisma.article.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  return {
    articles,
    totalPages: Math.max(1, Math.ceil(total / PER_PAGE)),
    currentPage: page,
  };
}

export const ARTICLE_PER_PAGE = PER_PAGE;

export async function getRelatedArticles(currentSlug: string, limit = 3) {
  return prisma.article.findMany({
    where: {
      status: ArticleStatus.PUBLISHED,
      slug: {
        not: currentSlug,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}
