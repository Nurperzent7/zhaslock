"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { getProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ProductSeed } from "@/lib/seedData";
import { Locale, getLocalized } from "@/lib/utils";

export default function ComparePage() {
  const [products, setProducts] = useState<ProductSeed[]>([]);
  const locale: Locale = "ru";

  useEffect(() => {
    getProducts(locale).then(setProducts);
  }, []);

  const features = ["Fingerprint", "PIN", "RFID", "WiFi", "Camera", "Face Recognition", "Palm", "Tuya"];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Сравнение моделей</h1>
        <p className="mt-4 text-muted-foreground">Сравните характеристики и выберите подходящий замок.</p>

        <div className="mt-10 overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="p-6">Характеристика</th>
                {products.map((p) => (
                  <th key={p.slug} className="min-w-[180px] p-6 text-center">{getLocalized(p.name, locale)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-6 font-medium">Цена</td>
                {products.map((p) => <td key={p.slug} className="p-6 text-center font-semibold">{p.price > 0 ? `${p.price.toLocaleString("ru-RU")} ₸` : "по запросу"}</td>)}
              </tr>
              {features.map((f) => (
                <tr key={f} className="border-b border-border">
                  <td className="p-6 font-medium">{f}</td>
                  {products.map((p) => {
                    const has = p.tags.some((t) => t.toLowerCase().includes(f.toLowerCase()));
                    return (
                      <td key={p.slug} className="p-6 text-center">
                        {has ? <Check className="mx-auto h-5 w-5 text-success" /> : <X className="mx-auto h-5 w-5 text-muted-foreground" />}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
