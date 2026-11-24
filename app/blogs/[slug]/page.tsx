import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleView from "@/components/blog/ArticleView";
import { articles, getArticle } from "@/data/blog";

export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  return a ? { title: `${a.title} — Markexa India`, description: a.excerpt } : {};
}

// export default async function ArticlePage({ params }: Props) {
//   const a = getArticle((await params).slug);
//   if (!a) notFound();
//   console.log("Requested slug:", (await params).slug);
// console.log("Found article:", !!a);
//   return <ArticleView article={a} />;
// }
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);

  console.log("Requested slug:", slug);
  console.log("Found article:", !!a);

  if (!a) notFound();

  return <ArticleView article={a} />;
}
