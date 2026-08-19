import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/data";
import { Locale, getLocalized } from "@/lib/utils";

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = await getArticleBySlug(slug, locale as Locale);
  if (!post) notFound();

  const title = getLocalized(post.title, locale as Locale) as string;
  const content = getLocalized(post.content, locale as Locale) as string;

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        <div className="mt-8 rounded-3xl border border-border bg-card p-8 shadow-soft">
          <p className="leading-relaxed text-foreground">{content}</p>
          <p className="mt-4 text-muted-foreground">Полная статья с SEO-разметкой, тегами и похожими материалами будет загружена через админ-панель.</p>
        </div>
      </div>
    </section>
  );
}
