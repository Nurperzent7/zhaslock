"use client";

import { useTranslations } from "next-intl";
import { Award, Wrench, Headphones, Truck, BadgeCheck, GraduationCap } from "lucide-react";
import { SlideUp } from "../motion/AnimatedSection";

const icons = [Award, Wrench, Headphones, Truck, BadgeCheck, GraduationCap];

export function WhyChooseUs() {
  const t = useTranslations("whyUs");
  const items = t.raw("items");

  return (
    <section className="relative overflow-hidden bg-primary py-24 text-white lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,124,134,0.35),transparent_55%)]" />
      <div className="absolute inset-0 grain opacity-[0.08] mix-blend-overlay" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <SlideUp>
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-[0.2em] text-teal-300/90">
            Why us
          </p>
          <h2 className="font-display text-balance text-center text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </SlideUp>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item: { title: string; desc: string }, i: number) => {
            const Icon = icons[i % icons.length];
            return (
              <SlideUp key={item.title} delay={i * 0.05}>
                <div className="group">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-teal-300 transition-colors group-hover:border-teal-300/40 group-hover:bg-teal-300/10">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </SlideUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
