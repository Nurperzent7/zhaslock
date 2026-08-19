"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { calculateInstall } from "@/lib/actions";

export default function CalculatorPage() {
  const [result, setResult] = useState<any>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await calculateInstall(formData);
    setResult(res);
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto max-w-2xl px-4 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Калькулятор стоимости установки</h1>
        <p className="mt-4 text-muted-foreground">Рассчитайте примерную стоимость установки и настройки замка.</p>

        <form onSubmit={onSubmit} className="mt-10 grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2"><Label>Тип замка</Label>
              <select name="type" className="h-11 w-full rounded-xl border border-border bg-background px-4">
                <option value="standard">Стандартный</option>
                <option value="premium">Премиум</option>
                <option value="withCamera">С камерой</option>
              </select>
            </div>
            <div className="space-y-2"><Label>Материал двери</Label>
              <select name="door" className="h-11 w-full rounded-xl border border-border bg-background px-4">
                <option value="wood">Дерево</option>
                <option value="metal">Металл</option>
                <option value="armored">Бронированная</option>
              </select>
            </div>
            <div className="space-y-2"><Label>Город</Label>
              <select name="city" className="h-11 w-full rounded-xl border border-border bg-background px-4">
                <option value="almaty">Алматы</option>
                <option value="other">Другой город</option>
              </select>
            </div>
          </div>
          <Button type="submit" className="rounded-full">Рассчитать</Button>
        </form>

        {result && (
          <Card className="mt-8 rounded-2xl">
            <CardContent className="p-6">
              <div className="text-2xl font-bold">Итого: {result.total.toLocaleString("ru-RU")} ₸</div>
              <div className="mt-2 text-sm text-muted-foreground">Базовая установка: {result.breakdown.base.toLocaleString("ru-RU")} ₸</div>
              <div className="text-sm text-muted-foreground">Дверь: {result.breakdown.door.toLocaleString("ru-RU")} ₸</div>
              <div className="text-sm text-muted-foreground">Доставка: {result.breakdown.delivery.toLocaleString("ru-RU")} ₸</div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
