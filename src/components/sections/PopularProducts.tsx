"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { SlideUp } from "../motion/AnimatedSection";
import { Locale } from "@/lib/utils";
import { ProductSeed } from "@/lib/seedData";
import { ArrowRight } from "lucide-react";

export function PopularProducts({ products, locale }: { products: ProductSeed[]; locale: Locale }) {
  const t = useTranslations("products");
  const pathname = usePathname();
  const activeLocale = (pathname.split("/")[1] as Locale) || locale;

  return (
    <section className="border-y border-border/60 bg-white py-24 dark:bg-card lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <SlideUp>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Catalog
              </p>
              <h2 className="font-display text-balance text-3xl font-bold tracking-tight md:text-5xl">
                {t("title")}
              </h2>
            </div>
            <Link href={`/${activeLocale}/products`}>
              <Button variant="outline" className="rounded-full gap-2">
                {t("all")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </SlideUp>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} locale={activeLocale} />
          ))}
        </div>
      </div>
    </section>
  );
}
