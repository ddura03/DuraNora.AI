import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticlePage } from "@/components/news/NewsArticlePage";
import { getAllNewsIds, getNewsById } from "@/lib/news-utils";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllNewsIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = getNewsById(id);
  if (!item) return { title: "Story not found" };
  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default async function NewsArticleRoute({ params }: Props) {
  const { id } = await params;
  const item = getNewsById(id);
  if (!item) notFound();
  return <NewsArticlePage item={item} />;
}
