import { MetadataRoute } from "next";
import { getProducts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locales = ["ru", "kk", "en"];

  const staticPages = ["", "products", "installation", "videos", "downloads", "blog", "contact", "calculator", "compatibility", "booking", "compare", "gallery", "cases", "map"];
  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page ? `/${page}` : ""}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1.0 : 0.7,
    }))
  );

  const products = await getProducts("ru");
  const productUrls = products.flatMap((product: any) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [...staticUrls, ...productUrls];
}
