"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { contactSchema, bookingSchema, compatibilitySchema } from "@/lib/schemas";

export async function submitContact(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const order = await prisma.order.create({
    data: {
      customerName: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      address: parsed.data.address,
      message: parsed.data.message,
      source: "contact",
    },
  });

  revalidatePath("/");
  return { success: true, orderId: order.id };
}

export async function submitBooking(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const order = await prisma.order.create({
    data: {
      customerName: parsed.data.name,
      phone: parsed.data.phone,
      address: parsed.data.address,
      message: `Дата: ${parsed.data.date}, Время: ${parsed.data.time}. Замок: ${parsed.data.lock || "не указан"}. ${parsed.data.notes || ""}`,
      source: "booking",
    },
  });

  revalidatePath("/booking");
  return { success: true, orderId: order.id };
}

export async function submitCompatibility(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = compatibilitySchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const { thickness, material, direction, hasMortise } = parsed.data;
  const fit = thickness >= 35 && thickness <= 60 && material !== "plastic" && hasMortise === "yes";
  const message = fit
    ? "Дверь подходит для установки большинства замков. Рекомендуем профессиональную установку."
    : "Для этой двери требуется консультация мастера. Мы подберём подходящее решение.";

  return { success: true, fit, message };
}

export async function calculateInstall(formData: FormData) {
  const type = formData.get("type") as string;
  const door = formData.get("door") as string;
  const city = formData.get("city") as string;
  const base = 15000;
  const doorPrice = { wood: 0, metal: 3000, armored: 7000 }[door] || 0;
  const cityPrice = city === "almaty" ? 0 : 5000;
  const total = base + doorPrice + cityPrice;
  return { total, breakdown: { base, door: doorPrice, delivery: cityPrice } };
}

export async function search(query: string) {
  const [products, articles] = await Promise.all([
    prisma.product.findMany({ take: 5, include: { tags: true } }),
    prisma.article.findMany({ where: { published: true }, take: 5 }),
  ]);
  const q = query.toLowerCase();
  const filteredProducts = products.filter((p: any) => {
    try {
      const name = JSON.parse(p.name);
      return Object.values(name).some((v: any) => v.toLowerCase().includes(q));
    } catch {
      return false;
    }
  });
  return { products: filteredProducts, articles };
}

export async function getOrders() {
  return prisma.order.findMany({ orderBy: { createdAt: "desc" }, include: { items: true } }).catch(() => []);
}

export async function getDashboardStats() {
  const [products, orders, reviews, contacts, articles, videos] = await Promise.all([
    prisma.product.count().catch(() => 0),
    prisma.order.count().catch(() => 0),
    prisma.review.count().catch(() => 0),
    prisma.order.count({ where: { source: "contact" } }).catch(() => 0),
    prisma.article.count().catch(() => 0),
    prisma.video.count().catch(() => 0),
  ]);
  return { products, orders, reviews, contacts, articles, videos };
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/dashboard/products");
  revalidatePath("/ru/products");
}

export async function upsertProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const nameRu = formData.get("nameRu") as string;
  const nameKk = formData.get("nameKk") as string;
  const nameEn = formData.get("nameEn") as string;
  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const slug = formData.get("slug") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const thumbnail = formData.get("thumbnail") as string;

  const payload: any = {
    slug,
    brand,
    model,
    price,
    stock,
    thumbnail,
    name: JSON.stringify({ ru: nameRu, kk: nameKk, en: nameEn }),
    shortDescription: JSON.stringify({ ru: "", kk: "", en: "" }),
    description: JSON.stringify({ ru: "", kk: "", en: "" }),
    gallery: "[]",
    features: "[]",
    specifications: "[]",
    colors: "[]",
    relatedSlugs: "[]",
    tags: { set: [] },
  };

  if (id) {
    await prisma.product.update({ where: { id }, data: payload });
  } else {
    await prisma.product.create({ data: payload });
  }
  revalidatePath("/admin/dashboard/products");
  revalidatePath("/ru/products");
}

function localeJson(ru: string, kk?: string, en?: string) {
  return JSON.stringify({
    ru: ru || "",
    kk: kk || ru || "",
    en: en || ru || "",
  });
}

export async function upsertArticle(formData: FormData) {
  const { uploadFile, slugify } = await import("@/lib/upload");
  const id = (formData.get("id") as string) || "";
  const titleRu = (formData.get("titleRu") as string) || "";
  const titleKk = (formData.get("titleKk") as string) || "";
  const titleEn = (formData.get("titleEn") as string) || "";
  const contentRu = (formData.get("contentRu") as string) || "";
  const contentKk = (formData.get("contentKk") as string) || "";
  const contentEn = (formData.get("contentEn") as string) || "";
  const estimatedMinutes = Number(formData.get("estimatedMinutes") || 5);
  const published = formData.get("published") === "on" || formData.get("published") === "true";
  let slug = ((formData.get("slug") as string) || "").trim() || slugify(titleRu);
  const coverUrl = ((formData.get("coverUrl") as string) || "").trim();
  const uploaded = await uploadFile(formData, "coverFile");
  const existingCover = (formData.get("existingCover") as string) || "";
  const coverImage = uploaded || coverUrl || existingCover || null;

  const payload = {
    slug,
    title: localeJson(titleRu, titleKk, titleEn),
    content: localeJson(contentRu, contentKk, contentEn),
    coverImage,
    estimatedMinutes: Number.isFinite(estimatedMinutes) ? estimatedMinutes : 5,
    published,
    tags: JSON.stringify(
      String(formData.get("tags") || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    ),
  };

  if (id) {
    await prisma.article.update({ where: { id }, data: payload });
  } else {
    const exists = await prisma.article.findUnique({ where: { slug } });
    if (exists) slug = `${slug}-${Date.now().toString(36)}`;
    await prisma.article.create({ data: { ...payload, slug } });
  }

  revalidatePath("/admin/dashboard/articles");
  revalidatePath("/ru/installation");
  revalidatePath("/kk/installation");
  revalidatePath("/en/installation");
}

export async function deleteArticle(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/dashboard/articles");
  revalidatePath("/ru/installation");
  revalidatePath("/kk/installation");
  revalidatePath("/en/installation");
}

export async function upsertVideo(formData: FormData) {
  const { uploadFile, slugify, extractYoutubeId } = await import("@/lib/upload");
  const id = (formData.get("id") as string) || "";
  const titleRu = (formData.get("titleRu") as string) || "";
  const titleKk = (formData.get("titleKk") as string) || "";
  const titleEn = (formData.get("titleEn") as string) || "";
  const descRu = (formData.get("descRu") as string) || "";
  const descKk = (formData.get("descKk") as string) || "";
  const descEn = (formData.get("descEn") as string) || "";
  const published = formData.get("published") === "on" || formData.get("published") === "true";
  let slug = ((formData.get("slug") as string) || "").trim() || slugify(titleRu);
  const youtubeInput = ((formData.get("youtubeUrl") as string) || "").trim();
  const youtubeId = extractYoutubeId(youtubeInput);
  const videoUrlField = ((formData.get("videoUrl") as string) || "").trim();
  const uploadedVideo = await uploadFile(formData, "videoFile");
  const existingVideo = (formData.get("existingVideo") as string) || "";
  const videoUrl = uploadedVideo || videoUrlField || existingVideo || null;
  const thumbUrl = ((formData.get("thumbUrl") as string) || "").trim();
  const uploadedThumb = await uploadFile(formData, "thumbFile");
  const existingThumb = (formData.get("existingThumb") as string) || "";
  const thumbnail = uploadedThumb || thumbUrl || existingThumb || null;

  if (!youtubeId && !videoUrl) {
    throw new Error("Добавьте YouTube-ссылку или загрузите видеофайл");
  }

  const payload = {
    slug,
    title: localeJson(titleRu, titleKk, titleEn),
    description: localeJson(descRu, descKk, descEn),
    youtubeId,
    videoUrl,
    thumbnail,
    published,
    tags: JSON.stringify(
      String(formData.get("tags") || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    ),
  };

  if (id) {
    await prisma.video.update({ where: { id }, data: payload });
  } else {
    const exists = await prisma.video.findUnique({ where: { slug } });
    if (exists) slug = `${slug}-${Date.now().toString(36)}`;
    await prisma.video.create({ data: { ...payload, slug } });
  }

  revalidatePath("/admin/dashboard/videos");
  revalidatePath("/ru/videos");
  revalidatePath("/kk/videos");
  revalidatePath("/en/videos");
}

export async function deleteVideo(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.video.delete({ where: { id } });
  revalidatePath("/admin/dashboard/videos");
  revalidatePath("/ru/videos");
  revalidatePath("/kk/videos");
  revalidatePath("/en/videos");
}
