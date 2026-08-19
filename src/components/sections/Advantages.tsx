"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Fingerprint, Hash, CreditCard, Smartphone, Wifi, Clock, Lock, Battery, Bell, ShieldCheck, History, KeyRound } from "lucide-react";
import { SlideUp } from "../motion/AnimatedSection";

const icons = [Fingerprint, Hash, CreditCard, Smartphone, Wifi, Clock, Lock, Battery, Bell, ShieldCheck, History, KeyRound];

export function Advantages() {
  const t = useTranslations("advantages");
  const items = t.raw("items");

  return (
    <section className="mesh-bg relative overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <SlideUp>
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Access
          </p>
          <h2 className="font-display text-balance text-center text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </SlideUp>
        <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item: { title: string; desc: string }, i: number) => {
            const Icon = icons[i % icons.length];
            return (
              <SlideUp key={item.title} delay={i * 0.04}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="group flex gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              </SlideUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
