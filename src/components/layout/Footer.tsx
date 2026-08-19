"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "ru";

  const links = [
    { href: "/products", label: t("products") },
    { href: "/installation", label: t("installation") },
    { href: "/videos", label: t("videos") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
    { href: "/calculator", label: t("calculator") },
    { href: "/gallery", label: t("gallery") },
    { href: "/map", label: t("map") },
  ];

  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href={`/${locale}`} className="font-display text-2xl font-bold tracking-tight">
              Zhas<span className="text-teal-300">lock</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/55">{tf("info")}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              {tf("info")}
            </h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={`/${locale}${l.href}`}
                    className="text-sm text-white/70 transition-colors hover:text-teal-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              {tf("contacts")}
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-teal-300" />
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}>
                  {process.env.NEXT_PUBLIC_PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-300" />
                <a href="mailto:info@zhaslock.kz">info@zhaslock.kz</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-teal-300" />
                <span>Астана, Казахстан</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              {tf("social")}
            </h4>
            <SocialLinks />
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Zhaslock. {tf("rights")}.
        </div>
      </div>
    </footer>
  );
}
