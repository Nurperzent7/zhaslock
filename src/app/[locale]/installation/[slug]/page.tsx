import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticleBySlug } from "@/lib/data";
import { Locale, getLocalized } from "@/lib/utils";
import { Clock, ChevronRight } from "lucide-react";

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale as Locale);
  if (!article) notFound();

  const title = getLocalized(article.title, locale as Locale) as string;
  const content = getLocalized(article.content, locale as Locale) as string;

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto max-w-4xl px-4 lg:px-8">
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/${locale}/installation`}>Академия</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{title}</span>
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{article.estimatedMinutes || 5} мин чтения</span>
        </div>

        {article.coverImage && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
            <Image src={article.coverImage} alt={title} fill className="object-cover" priority sizes="100vw" />
          </div>
        )}

        <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
          {content.split("\n").filter(Boolean).map((paragraph: string, i: number) => (
            <p key={i} className="text-base leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
