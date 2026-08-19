import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/lib/data";
import { ProductGallery } from "@/components/ProductGallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, Check, FileText, Download, Play, Phone, MessageCircle } from "lucide-react";
import { getLocalized, formatPrice, Locale } from "@/lib/utils";

export async function generateStaticParams() {
  const products = await getProducts("ru");
  return products.map((p: any) => ({ slug: p.slug, locale: "ru" }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale as Locale);
  if (!product) return { title: "404" };
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: `${getLocalized(product.name, locale as Locale)} — ${t("title")}`, description: getLocalized(product.shortDescription, locale as Locale) as string };
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale as Locale);
  if (!product) notFound();

  const name = getLocalized(product.name, locale as Locale) as string;
  const description = getLocalized(product.description, locale as Locale) as string;
  const short = getLocalized(product.shortDescription, locale as Locale) as string;
  const features = product.features.map((f) => getLocalized(f, locale as Locale) as string);
  const specs = product.specifications.map((s: any) => ({ key: getLocalized(s.key, locale as Locale) as string, value: getLocalized(s.value, locale as Locale) as string }));

  return (
    <div className="min-h-screen pb-24">
      <section className="bg-muted/30 py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <ProductGallery images={product.gallery} alt={name} />

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{product.brand}</Badge>
                {product.isNew && <Badge>NEW</Badge>}
                {product.isPopular && <Badge variant="success">HIT</Badge>}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{name}</h1>
              <p className="text-lg text-muted-foreground">{short}</p>
              <div className="flex items-center gap-2 text-amber-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount} отзывов)</span>
              </div>

              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold">{formatPrice(product.price, product.currency)}</span>
                {product.oldPrice && <span className="text-xl text-muted-foreground line-through">{formatPrice(product.oldPrice, product.currency)}</span>}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full px-8">Купить</Button>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Интересует ${name}`)}`} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="rounded-full px-8"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</Button>
                </a>
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}>
                  <Button size="lg" variant="outline" className="rounded-full px-8"><Phone className="mr-2 h-4 w-4" /> Позвонить</Button>
                </a>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Гарантия {product.warrantyMonths} мес.</div>
                <div className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> {product.stock > 0 ? "В наличии" : "Нет в наличии"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 lg:px-8">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="rounded-full bg-muted p-1">
            <TabsTrigger value="description" className="rounded-full px-4">Описание</TabsTrigger>
            <TabsTrigger value="specs" className="rounded-full px-4">Характеристики</TabsTrigger>
            <TabsTrigger value="install" className="rounded-full px-4">Установка</TabsTrigger>
            <TabsTrigger value="faq" className="rounded-full px-4">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-8">
            <p className="max-w-3xl leading-relaxed text-muted-foreground">{description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 rounded-xl bg-muted p-4">
                  <Check className="h-5 w-5 text-accent" /> <span className="font-medium">{f}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="specs" className="mt-8">
            <div className="max-w-2xl divide-y rounded-2xl border border-border">
              {specs.map((s, i) => (
                <div key={i} className="flex justify-between px-6 py-4">
                  <span className="text-muted-foreground">{s.key}</span>
                  <span className="font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="install" className="mt-8 space-y-4">
            {product.installationVideo && (
              <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-black">
                <iframe src={product.installationVideo} className="h-full w-full" allowFullScreen />
              </div>
            )}
            <div className="flex gap-4">
              {product.manualPDF && <a href={product.manualPDF} download className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-muted"><FileText className="h-4 w-4" /> Инструкция PDF</a>}
              {product.firmware && <a href={product.firmware} download className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-muted"><Download className="h-4 w-4" /> Прошивка</a>}
            </div>
          </TabsContent>
          <TabsContent value="faq" className="mt-8">
            <Accordion type="single" collapsible className="max-w-3xl">
              {product.faq?.length ? product.faq.map((f: any, i: number) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{getLocalized(f.question, locale as Locale)}</AccordionTrigger>
                  <AccordionContent>{getLocalized(f.answer, locale as Locale)}</AccordionContent>
                </AccordionItem>
              )) : (
                <p className="text-muted-foreground">Пока нет вопросов.</p>
              )}
            </Accordion>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
