import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Advantages } from "@/components/sections/Advantages";
import { PopularProducts } from "@/components/sections/PopularProducts";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { Newsletter } from "@/components/sections/Newsletter";
import { getPopularProducts } from "@/lib/data";
import { Locale } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const products = await getPopularProducts(locale);

  return (
    <>
      <Hero />
      <Advantages />
      <PopularProducts products={products} locale={locale} />
      <WhyChooseUs />
      <Reviews />
      <Faq />
      <Newsletter />
    </>
  );
}
