"use client";

import { useTranslations } from "next-intl";
import { SlideUp } from "../motion/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") || [
    { question: "Подойдёт ли замок к моей двери?", answer: "Большинство замков подходят для дверей толщиной 35-60 мм." },
    { question: "Сколько служат батарейки?", answer: "От 6 до 12 месяцев при среднем использовании." },
    { question: "Есть ли гарантия?", answer: "Да, от 1 до 3 лет в зависимости от модели." },
  ];

  return (
    <section className="bg-white py-24 dark:bg-card lg:py-32">
      <div className="container mx-auto max-w-3xl px-4 lg:px-8">
        <SlideUp>
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-[0.2em] text-accent">
            FAQ
          </p>
          <h2 className="font-display text-balance text-center text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </SlideUp>
        <SlideUp delay={0.1}>
          <Accordion type="single" collapsible className="mt-12">
            {items.map((item: { question: string; answer: string }, i: number) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/70">
                <AccordionTrigger className="font-display text-left text-lg font-semibold tracking-tight hover:no-underline hover:text-accent">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SlideUp>
      </div>
    </section>
  );
}
