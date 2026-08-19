import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteArticle, upsertArticle } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function parseLocale(value: string | null | undefined) {
  try {
    return JSON.parse(value || "{}") as { ru?: string; kk?: string; en?: string };
  } catch {
    return { ru: value || "" };
  }
}

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Академия установки</h1>
            <p className="mt-1 text-sm text-muted-foreground">Добавляйте статьи с обложкой (фото) и текстом.</p>
          </div>
          <Link href="/admin/dashboard">
            <Button variant="outline">Назад</Button>
          </Link>
        </div>

        <form action={upsertArticle} encType="multipart/form-data" className="mb-8 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Новая статья</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="titleRu" placeholder="Заголовок RU *" className="rounded-xl border px-4 py-2" required />
            <input name="titleKk" placeholder="Заголовок KK" className="rounded-xl border px-4 py-2" />
            <input name="titleEn" placeholder="Заголовок EN" className="rounded-xl border px-4 py-2" />
            <input name="slug" placeholder="Слаг (необязательно)" className="rounded-xl border px-4 py-2" />
            <input name="estimatedMinutes" type="number" min={1} defaultValue={5} placeholder="Минут чтения" className="rounded-xl border px-4 py-2" />
            <input name="tags" placeholder="Теги через запятую" className="rounded-xl border px-4 py-2" />
          </div>
          <textarea name="contentRu" rows={5} placeholder="Текст статьи RU *" className="w-full rounded-xl border px-4 py-2" required />
          <textarea name="contentKk" rows={3} placeholder="Текст KK" className="w-full rounded-xl border px-4 py-2" />
          <textarea name="contentEn" rows={3} placeholder="Текст EN" className="w-full rounded-xl border px-4 py-2" />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2 text-sm">
              <span className="font-medium">Загрузить фото обложки</span>
              <input name="coverFile" type="file" accept="image/*" className="block w-full text-sm" />
            </label>
            <label className="block space-y-2 text-sm">
              <span className="font-medium">или URL фото</span>
              <input name="coverUrl" placeholder="https://..." className="w-full rounded-xl border px-4 py-2" />
            </label>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input name="published" type="checkbox" defaultChecked />
            Опубликовать
          </label>

          <Button type="submit" className="rounded-full">Сохранить статью</Button>
        </form>

        <div className="grid gap-4">
          {articles.map((article) => {
            const title = parseLocale(article.title);
            return (
              <Card key={article.id}>
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  {article.coverImage ? (
                    <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <Image src={article.coverImage} alt={title.ru || ""} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded-xl bg-muted text-xs text-muted-foreground">
                      Нет фото
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{title.ru || article.slug}</div>
                    <div className="text-sm text-muted-foreground">
                      /{article.slug} · {article.published ? "опубликовано" : "черновик"} · {article.estimatedMinutes} мин
                    </div>
                  </div>
                  <form action={deleteArticle}>
                    <input type="hidden" name="id" value={article.id} />
                    <Button type="submit" variant="destructive" size="sm" className="rounded-full">
                      Удалить
                    </Button>
                  </form>
                </CardContent>
              </Card>
            );
          })}
          {!articles.length && (
            <p className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
              Пока нет статей — добавьте первую выше.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
