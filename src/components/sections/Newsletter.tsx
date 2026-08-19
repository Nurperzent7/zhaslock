"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlideUp } from "../motion/AnimatedSection";

export function Newsletter() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden border-t border-border py-24 lg:py-32">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,124,134,0.12),transparent_60%)]" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <SlideUp>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                className="h-12 rounded-full border-border bg-white px-6 shadow-soft dark:bg-card"
              />
              <Button type="submit" className="h-12 rounded-full bg-accent px-8 hover:bg-accent/90">
                {t("button")}
              </Button>
            </form>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
