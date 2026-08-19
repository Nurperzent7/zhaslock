"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { submitCompatibility } from "@/lib/actions";

export default function CompatibilityPage() {
  const [result, setResult] = useState<any>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await submitCompatibility(formData);
    setResult(res);
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto max-w-2xl px-4 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Проверка совместимости</h1>
        <p className="mt-4 text-muted-foreground">Узнайте, подойдёт ли умный замок к вашей двери.</p>

        <form onSubmit={onSubmit} className="mt-10 grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="space-y-2">
            <Label>Толщина двери (мм)</Label>
            <Input name="thickness" type="number" placeholder="40" required />
          </div>
          <div className="space-y-2">
            <Label>Материал двери</Label>
            <select name="material" className="h-11 w-full rounded-xl border border-border bg-background px-4">
              <option value="wood">Дерево</option>
              <option value="metal">Металл</option>
              <option value="plastic">Пластик</option>
              <option value="other">Другое</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Направление открывания</Label>
            <select name="direction" className="h-11 w-full rounded-xl border border-border bg-background px-4">
              <option value="left">Налево</option>
              <option value="right">Направо</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Есть ли врезка под замок?</Label>
            <select name="hasMortise" className="h-11 w-full rounded-xl border border-border bg-background px-4">
              <option value="yes">Да</option>
              <option value="no">Нет</option>
            </select>
          </div>
          <Button type="submit" className="rounded-full">Проверить</Button>
        </form>

        {result && (
          <Card className={`mt-8 rounded-2xl border-l-4 ${result.fit ? "border-l-success" : "border-l-destructive"}`}>
            <CardContent className="flex items-center gap-4 p-6">
              {result.fit ? <CheckCircle className="h-8 w-8 text-success" /> : <XCircle className="h-8 w-8 text-destructive" />}
              <p className="font-medium">{result.message}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
