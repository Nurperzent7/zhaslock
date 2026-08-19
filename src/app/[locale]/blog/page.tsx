import Link from "next/link";
import { getArticles } from "@/lib/data";
import { Locale, getLocalized } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const posts = await getArticles(locale);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Блог</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Полезные материалы про умные замки, безопасность и обзоры.</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-glass">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold">{getLocalized(post.title, locale)}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{getLocalized(post.content, locale)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
