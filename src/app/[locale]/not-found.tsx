"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "ru";

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-9xl font-bold text-accent">404</h1>
      <h2 className="mt-6 text-3xl font-semibold">{t("title")}</h2>
      <Link href={`/${locale}`}>
        <Button className="mt-8 rounded-full px-8">{t("back")}</Button>
      </Link>
    </section>
  );
}
