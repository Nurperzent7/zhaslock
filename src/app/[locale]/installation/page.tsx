import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/data";
import { Locale, getLocalized } from "@/lib/utils";
import { Clock } from "lucide-react";

export default async function InstallationPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const articles = await getArticles(locale);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Академия установки</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Пошаговые инструкции, настройки и решение проблем.</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article: any) => (
            <Link
              key={article.slug}
              href={`/${locale}/installation/${article.slug}`}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card transition-shadow hover:shadow-glass"
            >
              <div className="relative aspect-[16/10] bg-muted">
                {article.coverImage ? (
                  <Image
                    src={article.coverImage}
                    alt={getLocalized(article.title, locale) as string}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Без обложки</div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {article.estimatedMinutes || 5} мин
                </div>
                <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">
                  {getLocalized(article.title, locale)}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {getLocalized(article.content, locale)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
