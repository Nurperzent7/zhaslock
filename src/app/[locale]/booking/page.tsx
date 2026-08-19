"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitBooking } from "@/lib/actions";

export default function BookingPage() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await submitBooking(formData);
    setOk(true);
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Запись на установку</h1>
        <p className="mt-4 text-muted-foreground">Выберите удобное время — мастер приедет и настроит замок.</p>

        <form onSubmit={onSubmit} className="mt-10 grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2"><Label>Имя</Label><Input name="name" required /></div>
            <div className="space-y-2"><Label>Телефон</Label><Input name="phone" type="tel" required /></div>
            <div className="space-y-2"><Label>Адрес</Label><Input name="address" required /></div>
            <div className="space-y-2"><Label>Модель замка</Label><Input name="lock" /></div>
            <div className="space-y-2"><Label>Дата</Label><Input name="date" type="date" required /></div>
            <div className="space-y-2"><Label>Время</Label><Input name="time" type="time" required /></div>
          </div>
          <div className="space-y-2"><Label>Комментарий</Label><Textarea name="notes" rows={3} /></div>
          <Button type="submit" className="rounded-full" disabled={loading}>{loading ? "Отправка..." : "Записаться"}</Button>
          {ok && <p className="text-center text-success">Заявка отправлена! Мы свяжемся с вами.</p>}
        </form>
      </div>
    </section>
  );
}
