import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getProducts, getBrands } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters, ProductSort } from "@/components/ProductFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Locale } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: `${t("title")} — Каталог`, description: t("description") };
}

function sortProducts(products: any[], sort: string | null) {
  if (sort === "priceAsc") return [...products].sort((a, b) => (a.price || Number.POSITIVE_INFINITY) - (b.price || Number.POSITIVE_INFINITY));
  if (sort === "priceDesc") return [...products].sort((a, b) => (b.price || 0) - (a.price || 0));
  if (sort === "popular") return [...products].sort((a, b) => b.rating - a.rating);
  return [...products].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const locale = (await params).locale as Locale;
  const sp = await searchParams;
  const filters = {
    brand: sp.brand,
    feature: sp.feature,
    min: sp.min ? Number(sp.min) : undefined,
    max: sp.max ? Number(sp.max) : undefined,
  };

  const [products, brands] = await Promise.all([getProducts(locale, filters), getBrands()]);
  const sorted = sortProducts(products, sp.sort || null);

  return (
    <section className="min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Каталог</h1>
            <p className="mt-2 text-muted-foreground">Умные замки для дома и офиса</p>
          </div>
          <ProductSort />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <ProductFilters brands={brands} />
          </aside>

          <Suspense fallback={<ProductsSkeleton />}>
            <div className="lg:col-span-3">
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {sorted.map((product) => (
                  <ProductCard key={product.slug} product={product} locale={locale} />
                ))}
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function ProductsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="aspect-[4/3] w-full rounded-2xl" />
      ))}
    </div>
  );
}
