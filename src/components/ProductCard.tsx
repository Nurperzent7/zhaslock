"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Star, Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Locale, formatPrice, getLocalized } from "@/lib/utils";
import { ProductSeed } from "@/lib/seedData";

export function ProductCard({ product, locale }: { product: ProductSeed; locale: Locale }) {
  const t = useTranslations("products");
  const pathname = usePathname();
  const activeLocale = (pathname.split("/")[1] as Locale) || locale;

  return (
    <article className="group flex flex-col">
      <Link
        href={`/${activeLocale}/products/${product.slug}`}
        className="relative aspect-[4/3] overflow-hidden bg-white"
      >
        <Image
          src={product.thumbnail}
          alt={getLocalized(product.name, activeLocale) as string}
          fill
          className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.isNew && (
          <Badge className="absolute left-4 top-4 rounded-full bg-accent text-white hover:bg-accent">
            NEW
          </Badge>
        )}
        {!product.stock && (
          <Badge variant="muted" className="absolute left-4 top-4">
            {t("outOfStock")}
          </Badge>
        )}
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <div className="text-xs font-medium uppercase tracking-wider text-accent">{product.brand}</div>
        <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
          <Link href={`/${activeLocale}/products/${product.slug}`} className="hover:text-accent">
            {getLocalized(product.name, activeLocale)}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {getLocalized(product.shortDescription, activeLocale)}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center text-foreground">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="ml-1 text-sm font-semibold">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="mt-3 flex items-end gap-2">
          <span className="font-display text-2xl font-bold tracking-tight">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.oldPrice, product.currency)}
            </span>
          )}
        </div>
        {product.stock > 0 && (
          <div className="mt-2 flex items-center gap-1 text-xs text-success">
            <Check className="h-3.5 w-3.5" /> {t("inStock")}
          </div>
        )}
        <div className="mt-5">
          <Link href={`/${activeLocale}/products/${product.slug}`}>
            <Button className="w-full rounded-full gap-2" variant="outline">
              {t("more")} <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
