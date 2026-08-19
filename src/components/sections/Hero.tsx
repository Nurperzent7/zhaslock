"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "ru";

  return (
    <section className="relative -mt-16 flex min-h-[100svh] items-center overflow-hidden bg-[#06090f] text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=2400&q=85"
          alt="Smart door lock"
          fill
          priority
          className="object-cover object-[70%_center] animate-ken-burns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06090f]/92 via-[#0b1220]/55 to-[#0b1220]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090f]/80 via-transparent to-[#0b1220]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(14,124,134,0.35),transparent_45%)]" />
        <div className="absolute inset-0 grain opacity-[0.1] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full px-4 pb-16 pt-28 sm:pb-20 lg:px-8 lg:pt-32">
        <div className="container mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.75rem,10vw,6.75rem)] font-bold leading-[0.92] tracking-[-0.04em]"
          >
            Zhas<span className="text-teal-300">lock</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-balance text-lg font-medium tracking-tight text-white/90 sm:text-2xl md:text-[1.75rem]"
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-w-md text-sm text-white/65 sm:text-base"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href={`/${locale}/products`}>
              <Button
                size="lg"
                className="rounded-full bg-white px-8 py-6 text-base text-primary hover:bg-white/90"
              >
                {t("buy")} <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-white/5 px-8 py-6 text-base text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
              >
                {t("consult")}
              </Button>
            </Link>
            <a
              href="#video"
              className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              {t("watch")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
