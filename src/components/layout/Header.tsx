"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { key: "products", href: "/products" },
  { key: "installation", href: "/installation" },
  { key: "videos", href: "/videos" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const locale = pathname.split("/")[1] || "ru";
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        overHero
          ? "border-transparent bg-transparent"
          : "border-b border-border/50 bg-background/85 backdrop-blur-xl"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link
          href={`/${locale}`}
          className={cn(
            "font-display text-2xl font-bold tracking-tight transition-colors",
            overHero ? "text-white" : "text-primary"
          )}
        >
          Zhas
          <span className={overHero ? "text-teal-300" : "text-accent"}>lock</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => {
            const href = `/${locale}${item.href}`;
            const active = pathname.startsWith(href);
            return (
              <Link
                key={item.key}
                href={href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  overHero
                    ? active
                      ? "bg-white/15 text-white"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                    : active
                      ? "bg-muted text-accent"
                      : "hover:bg-muted"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href={`/${locale}/products`}>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("search")}
              className={overHero ? "text-white hover:bg-white/10 hover:text-white" : ""}
            >
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <div className={overHero ? "[&_button]:text-white [&_button]:hover:bg-white/10" : ""}>
            <LocaleSwitcher />
          </div>
          <div className={overHero ? "[&_button]:text-white [&_button]:hover:bg-white/10" : ""}>
            <ThemeToggle />
          </div>
          <Link href={`/${locale}/contact`}>
            <Button
              className={cn(
                "rounded-full px-6",
                overHero && "bg-white text-primary hover:bg-white/90"
              )}
            >
              {t("contact")}
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <div className={overHero ? "[&_button]:text-white [&_button]:hover:bg-white/10" : ""}>
            <LocaleSwitcher />
          </div>
          <div className={overHero ? "[&_button]:text-white [&_button]:hover:bg-white/10" : ""}>
            <ThemeToggle />
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={overHero ? "text-white hover:bg-white/10 hover:text-white" : ""}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-8 flex flex-col gap-2">
                {nav.map((item) => (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href}`}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-lg font-medium hover:bg-muted"
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <Link href={`/${locale}/contact`} onClick={() => setOpen(false)}>
                  <Button className="mt-4 w-full rounded-full">{t("contact")}</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
