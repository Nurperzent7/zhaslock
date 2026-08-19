"use server";

import { prisma } from "@/lib/prisma";
import { Locale } from "./utils";
import { sampleProducts, articlesSeed, videosSeed, faqsSeed, reviewsSeed, casesSeed, categoriesSeed, ProductSeed, productScalarData, obsoleteProductSlugs } from "./seedData";

function safeJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function toLocale(value: string | null | undefined): { ru: string; kk: string; en: string } {
  return safeJson(value, { ru: "", kk: "", en: "" });
}

function toArray<T>(value: string | null | undefined): T[] {
  return safeJson(value, []);
}

function dbToProduct(row: any): ProductSeed {
  return {
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    price: row.price,
    currency: row.currency,
    oldPrice: row.oldPrice || undefined,
    name: toLocale(row.name),
    shortDescription: toLocale(row.shortDescription),
    description: toLocale(row.description),
    thumbnail: row.thumbnail || "",
    gallery: toArray<string>(row.gallery),
    features: toArray<{ ru: string; kk: string; en: string }>(row.features),
    specifications: toArray<any>(row.specifications),
    stock: row.stock,
    rating: row.rating,
    reviewCount: row.reviewCount,
    colors: toArray<string>(row.colors),
    tags: row.tags?.map((t: any) => t.name) || [],
    installationVideo: row.installationVideo || "",
    manualPDF: row.manualPDF || "",
    firmware: row.firmware || "",
    isPopular: row.isPopular,
    isNew: row.isNew,
    availability: row.availability,
    warrantyMonths: row.warrantyMonths,
    relatedSlugs: toArray<string>(row.relatedSlugs),
  };
}

async function withDb<T>(fn: () => Promise<T>, fallback: T | (() => T)): Promise<T> {
  try {
    return await fn();
  } catch {
    return typeof fallback === "function" ? (fallback as () => T)() : fallback;
  }
}

export async function ensureProducts() {
  try {
    const existing = await prisma.product.findMany({ select: { slug: true, price: true, thumbnail: true } });
    const bySlug = new Map(existing.map((r) => [r.slug, r]));
    const hasObsolete = obsoleteProductSlugs.some((slug) => bySlug.has(slug));
    const needsSync =
      hasObsolete ||
      sampleProducts.some((p) => {
        const row = bySlug.get(p.slug);
        return !row || row.price !== p.price || row.thumbnail !== p.thumbnail;
      });
    if (existing.length > 0 && !needsSync) return;

    for (const p of sampleProducts) {
      const tags = { connectOrCreate: p.tags.map((t) => ({ where: { name: t }, create: { name: t } })) };
      await prisma.product.upsert({
        where: { slug: p.slug },
        update: { ...productScalarData(p), tags: { set: [], ...tags } },
        create: { ...productScalarData(p), tags },
      });
    }
    await prisma.product.deleteMany({ where: { slug: { in: obsoleteProductSlugs } } });
  } catch {
    return;
  }
}

export async function getProducts(locale: Locale, filters?: { brand?: string; feature?: string; min?: number; max?: number }) {
  return withDb(async () => {
    await ensureProducts();
    const where: any = {};
    if (filters?.brand) where.brand = filters.brand;
    if (filters?.feature) where.tags = { some: { name: filters.feature } };
    if (filters?.min !== undefined || filters?.max !== undefined) {
      where.price = {};
      if (filters.min !== undefined) where.price.gte = filters.min;
      if (filters.max !== undefined) where.price.lte = filters.max;
    }
    const rows = await prisma.product.findMany({ where, include: { tags: true } });
    if (!rows.length) return sampleProducts;
    return rows.map(dbToProduct);
  }, () => {
    let products = sampleProducts;
    if (filters?.brand) products = products.filter((p) => p.brand === filters.brand);
    if (filters?.min !== undefined) products = products.filter((p) => p.price >= filters.min!);
    if (filters?.max !== undefined) products = products.filter((p) => p.price <= filters.max!);
    return products;
  });
}

export async function getProductBySlug(slug: string, locale: Locale) {
  return withDb(async () => {
    await ensureProducts();
    const row = await prisma.product.findUnique({ where: { slug }, include: { tags: true, reviews: true, faq: true } });
    if (!row) return sampleProducts.find((p) => p.slug === slug) || null;
    return dbToProduct(row);
  }, () => sampleProducts.find((p) => p.slug === slug) || null);
}

export async function getPopularProducts(locale: Locale) {
  return withDb(async () => {
    await ensureProducts();
    const rows = await prisma.product.findMany({ where: { isPopular: true }, take: 6, include: { tags: true } });
    if (!rows.length) return sampleProducts.filter((p) => p.isPopular);
    return rows.map(dbToProduct);
  }, () => sampleProducts.filter((p) => p.isPopular));
}

export async function getBrands() {
  return withDb(async () => {
    await ensureProducts();
    const brands = await prisma.product.groupBy({ by: ["brand"] });
    return brands.map((b: any) => b.brand);
  }, () => [...new Set(sampleProducts.map((p) => p.brand))]);
}

export async function getCategories(locale: Locale) {
  return withDb(async () => {
    const cats = await prisma.category.findMany();
    if (!cats.length) return categoriesSeed;
    return cats.map((c: any) => ({ ...c, name: toLocale(c.name), description: toLocale(c.description) }));
  }, categoriesSeed);
}

export async function getArticles(locale: Locale) {
  return withDb(async () => {
    const rows = await prisma.article.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
    if (!rows.length) return articlesSeed;
    return rows.map((r: any) => ({
      ...r,
      title: toLocale(r.title),
      content: toLocale(r.content),
      coverImage: r.coverImage || undefined,
    }));
  }, articlesSeed);
}

export async function getArticleBySlug(slug: string, locale: Locale) {
  return withDb(async () => {
    const row = await prisma.article.findUnique({ where: { slug } });
    if (!row) return articlesSeed.find((a) => a.slug === slug) || null;
    return {
      ...row,
      title: toLocale(row.title),
      content: toLocale(row.content),
      coverImage: row.coverImage || undefined,
    };
  }, () => articlesSeed.find((a) => a.slug === slug) || null);
}

export async function getVideos(locale: Locale) {
  return withDb(async () => {
    const rows = await prisma.video.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
    if (!rows.length) return videosSeed;
    return rows.map((r: any) => ({
      ...r,
      title: toLocale(r.title),
      description: toLocale(r.description),
      youtubeId: r.youtubeId || undefined,
      videoUrl: r.videoUrl || undefined,
      thumbnail: r.thumbnail || undefined,
    }));
  }, videosSeed);
}

export async function getFaqs(locale: Locale) {
  return withDb(async () => {
    const rows = await prisma.faq.findMany({ orderBy: { order: "asc" } });
    if (!rows.length) return faqsSeed;
    return rows.map((r: any) => ({ question: toLocale(r.question), answer: toLocale(r.answer) }));
  }, faqsSeed);
}

export async function getReviews(locale: Locale) {
  return withDb(async () => {
    const rows = await prisma.review.findMany({ where: { isPublic: true }, take: 10 });
    if (!rows.length) return reviewsSeed.map((r) => ({ ...r, text: r.text }));
    return rows.map((r: any) => ({ name: r.name, avatar: r.avatar, rating: r.rating, text: toLocale(r.text) }));
  }, () => reviewsSeed.map((r) => ({ ...r, text: r.text })));
}

export async function getCases(locale: Locale) {
  return withDb(async () => {
    const rows = await prisma.clientCase.findMany({ take: 6 });
    if (!rows.length) return casesSeed;
    return rows.map((r: any) => ({ ...r, title: toLocale(r.title), summary: toLocale(r.summary) }));
  }, casesSeed);
}

export async function searchProducts(locale: Locale, q: string) {
  return withDb(async () => {
    const rows = await prisma.product.findMany({ include: { tags: true } });
    if (!rows.length) {
      return sampleProducts.filter((p: ProductSeed) =>
        Object.values(p.name).some((v: string) => v.toLowerCase().includes(q.toLowerCase()))
      );
    }
    return rows.map(dbToProduct).filter((p: ProductSeed) =>
      Object.values(p.name).some((v: string) => v.toLowerCase().includes(q.toLowerCase())) ||
      p.tags.some((t: string) => t.toLowerCase().includes(q.toLowerCase()))
    );
  }, () =>
    sampleProducts.filter((p: ProductSeed) =>
      Object.values(p.name).some((v: string) => v.toLowerCase().includes(q.toLowerCase()))
    )
  );
}
