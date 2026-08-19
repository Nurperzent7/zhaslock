import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteVideo, upsertVideo } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function parseLocale(value: string | null | undefined) {
  try {
    return JSON.parse(value || "{}") as { ru?: string; kk?: string; en?: string };
  } catch {
    return { ru: value || "" };
  }
}

export default async function AdminVideosPage() {
  const videos = await prisma.video.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Видеоуроки</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              YouTube-ссылка или загрузка своего видео + превью-фото.
            </p>
          </div>
          <Link href="/admin/dashboard">
            <Button variant="outline">Назад</Button>
          </Link>
        </div>

        <form action={upsertVideo} encType="multipart/form-data" className="mb-8 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Новое видео</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="titleRu" placeholder="Название RU *" className="rounded-xl border px-4 py-2" required />
            <input name="titleKk" placeholder="Название KK" className="rounded-xl border px-4 py-2" />
            <input name="titleEn" placeholder="Название EN" className="rounded-xl border px-4 py-2" />
            <input name="slug" placeholder="Слаг (необязательно)" className="rounded-xl border px-4 py-2" />
            <input name="tags" placeholder="Теги через запятую" className="rounded-xl border px-4 py-2 sm:col-span-2" />
          </div>
          <textarea name="descRu" rows={3} placeholder="Описание RU" className="w-full rounded-xl border px-4 py-2" />
          <textarea name="descKk" rows={2} placeholder="Описание KK" className="w-full rounded-xl border px-4 py-2" />
          <textarea name="descEn" rows={2} placeholder="Описание EN" className="w-full rounded-xl border px-4 py-2" />

          <div className="rounded-xl border border-dashed border-border p-4 space-y-3">
            <div className="text-sm font-medium">Видео</div>
            <input
              name="youtubeUrl"
              placeholder="YouTube ссылка или ID (https://youtube.com/watch?v=...)"
              className="w-full rounded-xl border px-4 py-2"
            />
            <div className="text-center text-xs text-muted-foreground">или</div>
            <label className="block space-y-2 text-sm">
              <span>Загрузить видеофайл (mp4, webm…)</span>
              <input name="videoFile" type="file" accept="video/*" className="block w-full text-sm" />
            </label>
            <input name="videoUrl" placeholder="или URL видеофайла https://..." className="w-full rounded-xl border px-4 py-2" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2 text-sm">
              <span className="font-medium">Превью-фото (файл)</span>
              <input name="thumbFile" type="file" accept="image/*" className="block w-full text-sm" />
            </label>
            <label className="block space-y-2 text-sm">
              <span className="font-medium">или URL превью</span>
              <input name="thumbUrl" placeholder="https://..." className="w-full rounded-xl border px-4 py-2" />
            </label>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input name="published" type="checkbox" defaultChecked />
            Опубликовать
          </label>

          <Button type="submit" className="rounded-full">Сохранить видео</Button>
        </form>

        <div className="grid gap-4">
          {videos.map((video) => {
            const title = parseLocale(video.title);
            const thumb =
              video.thumbnail ||
              (video.youtubeId ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg` : null);
            return (
              <Card key={video.id}>
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  {thumb ? (
                    <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <Image src={thumb} alt={title.ru || ""} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded-xl bg-muted text-xs text-muted-foreground">
                      Нет превью
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{title.ru || video.slug}</div>
                    <div className="text-sm text-muted-foreground">
                      {video.youtubeId ? `YouTube: ${video.youtubeId}` : video.videoUrl || "файл"}
                      {" · "}
                      {video.published ? "опубликовано" : "черновик"}
                    </div>
                  </div>
                  <form action={deleteVideo}>
                    <input type="hidden" name="id" value={video.id} />
                    <Button type="submit" variant="destructive" size="sm" className="rounded-full">
                      Удалить
                    </Button>
                  </form>
                </CardContent>
              </Card>
            );
          })}
          {!videos.length && (
            <p className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
              Пока нет видео — добавьте первое выше.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
