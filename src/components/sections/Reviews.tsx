"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { SlideUp } from "../motion/AnimatedSection";

export function Reviews() {
  const t = useTranslations("reviews");
  const reviews = t.raw("items") || [
    { name: "Александр", rating: 5, text: "Отличный замок, установка заняла 40 минут.", avatar: "https://i.pravatar.cc/150?u=alex" },
    { name: "Дана", rating: 5, text: "Красивый и надёжный. Очень довольна.", avatar: "https://i.pravatar.cc/150?u=dana" },
    { name: "Марат", rating: 5, text: "Теперь не нужно носить ключи. Приложение удобное.", avatar: "https://i.pravatar.cc/150?u=marat" },
  ];

  return (
    <section className="mesh-bg py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <SlideUp>
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Reviews
          </p>
          <h2 className="font-display text-balance text-center text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </SlideUp>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {reviews.map((review: any, i: number) => (
            <SlideUp key={review.name + i} delay={i * 0.1}>
              <blockquote className="flex h-full flex-col border-l-2 border-accent/40 pl-6">
                <div className="flex items-center gap-1 text-accent">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="my-5 flex-1 font-display text-xl font-medium leading-snug tracking-tight text-foreground">
                  “{review.text}”
                </p>
                <footer className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                    {review.avatar && (
                      <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{t("verified")}</div>
                  </div>
                </footer>
              </blockquote>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
}
