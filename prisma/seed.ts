import { hashSync } from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { sampleProducts, categoriesSeed, articlesSeed, videosSeed, faqsSeed, reviewsSeed, casesSeed, productScalarData, obsoleteProductSlugs } from "../src/lib/seedData";

async function upsertProduct(p: (typeof sampleProducts)[number]) {
  const tags = { connectOrCreate: p.tags.map((t) => ({ where: { name: t }, create: { name: t } })) };
  await prisma.product.upsert({
    where: { slug: p.slug },
    update: { ...productScalarData(p), tags: { set: [], ...tags } },
    create: { ...productScalarData(p), tags },
  });
}

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@zhaslock.kz";
  const password = process.env.ADMIN_PASSWORD || "admin12345";

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Admin",
      password: hashSync(password, 10),
      role: "ADMIN",
    },
  });

  for (const c of categoriesSeed) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: { slug: c.slug, name: JSON.stringify(c.name), description: JSON.stringify(c.description) },
    });
  }

  for (const p of sampleProducts) {
    await upsertProduct(p);
  }

  await prisma.product.deleteMany({ where: { slug: { in: obsoleteProductSlugs } } });

  const products = await prisma.product.findMany();

  for (const a of articlesSeed) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: { slug: a.slug, title: JSON.stringify(a.title), content: JSON.stringify(a.content), coverImage: a.coverImage, estimatedMinutes: a.estimatedMinutes, tags: JSON.stringify(a.tags) },
    });
  }

  for (const v of videosSeed) {
    await prisma.video.upsert({
      where: { slug: v.slug },
      update: {
        youtubeId: v.youtubeId,
        videoUrl: v.videoUrl || null,
        thumbnail: v.thumbnail || null,
        description: JSON.stringify(v.description || { ru: "", kk: "", en: "" }),
      },
      create: {
        slug: v.slug,
        title: JSON.stringify(v.title),
        description: JSON.stringify(v.description || { ru: "", kk: "", en: "" }),
        youtubeId: v.youtubeId,
        videoUrl: v.videoUrl || null,
        thumbnail: v.thumbnail || null,
        tags: JSON.stringify(v.tags),
      },
    });
  }

  let order = 0;
  for (const f of faqsSeed) {
    await prisma.faq.create({ data: { question: JSON.stringify(f.question), answer: JSON.stringify(f.answer), order: order++ } });
  }

  for (const r of reviewsSeed) {
    const product = products.find((p: any) => p.slug === r.productSlug);
    if (product) {
      await prisma.review.create({ data: { name: r.name, avatar: r.avatar, rating: r.rating, text: JSON.stringify(r.text), productId: product.id, isPublic: true } });
    }
  }

  for (const c of casesSeed) {
    await prisma.clientCase.create({ data: { title: JSON.stringify(c.title), summary: JSON.stringify(c.summary), clientName: c.clientName, location: c.location, rating: c.rating } });
  }

  console.log("Database seeded.");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
