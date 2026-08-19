"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContact } from "@/lib/actions";
import { SocialLinks } from "@/components/SocialLinks";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await submitContact(formData);
    setOk(true);
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-muted-foreground">Заполните форму — мы перезвоним в течение 15 минут.</p>

          <form onSubmit={onSubmit} className="mt-10 grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2"><Label>{t("name")}</Label><Input name="name" required /></div>
              <div className="space-y-2"><Label>{t("phone")}</Label><Input name="phone" type="tel" required /></div>
              <div className="space-y-2"><Label>{t("email")}</Label><Input name="email" type="email" /></div>
              <div className="space-y-2"><Label>{t("lock")}</Label><Input name="lock" /></div>
            </div>
            <div className="space-y-2"><Label>{t("address")}</Label><Input name="address" /></div>
            <div className="space-y-2"><Label>{t("message")}</Label><Textarea name="message" rows={4} /></div>
            <Button type="submit" className="rounded-full" disabled={loading}>{loading ? "Отправка..." : t("send")}</Button>
            {ok && <p className="text-center text-success">{t("success")}</p>}
          </form>

          <div className="mt-12 grid gap-6 sm:grid-cols-3 text-center">
            <div className="rounded-2xl border border-border p-6">
              <div className="text-sm text-muted-foreground">{t("phone")}</div>
              <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="mt-2 block font-semibold">{process.env.NEXT_PUBLIC_PHONE_NUMBER}</a>
            </div>
            <div className="rounded-2xl border border-border p-6">
              <div className="text-sm text-muted-foreground">Email</div>
              <a href="mailto:info@zhaslock.kz" className="mt-2 block font-semibold">info@zhaslock.kz</a>
            </div>
            <div className="rounded-2xl border border-border p-6">
              <div className="text-sm text-muted-foreground">{t("hours")}</div>
              <div className="mt-2 block font-semibold">09:00 — 21:00</div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <SocialLinks variant="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
