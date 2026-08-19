import Image from "next/image";
import { getVideos } from "@/lib/data";
import { Locale, getLocalized } from "@/lib/utils";

export default async function VideosPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const videos = await getVideos(locale);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Видеоуроки</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Обучающие видео по установке, настройке и использованию.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video: any) => {
            const title = getLocalized(video.title, locale) as string;
            const description = video.description ? (getLocalized(video.description, locale) as string) : "";
            return (
              <article key={video.slug} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <div className="aspect-video w-full bg-black">
                  {video.youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : video.videoUrl ? (
                    <video
                      controls
                      poster={video.thumbnail || undefined}
                      className="h-full w-full object-contain"
                      src={video.videoUrl}
                    >
                      Ваш браузер не поддерживает видео.
                    </video>
                  ) : video.thumbnail ? (
                    <div className="relative h-full w-full">
                      <Image src={video.thumbnail} alt={title} fill className="object-cover" />
                    </div>
                  ) : null}
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
                  {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
