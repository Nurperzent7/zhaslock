import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Товары</h1>
          <Link href="/admin/dashboard">
            <Button variant="outline">Назад</Button>
          </Link>
        </div>

        <form action={upsertProductWrapper} className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="mb-4 text-lg font-semibold">Добавить товар</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="slug" placeholder="Слаг" className="rounded-xl border px-4 py-2" required />
            <input name="brand" placeholder="Бренд" className="rounded-xl border px-4 py-2" required />
            <input name="model" placeholder="Модель" className="rounded-xl border px-4 py-2" required />
            <input name="price" type="number" placeholder="Цена" className="rounded-xl border px-4 py-2" required />
            <input name="stock" type="number" placeholder="Остаток" className="rounded-xl border px-4 py-2" required />
            <input name="thumbnail" placeholder="URL изображения" className="rounded-xl border px-4 py-2" required />
            <input name="nameRu" placeholder="Название RU" className="rounded-xl border px-4 py-2" required />
            <input name="nameKk" placeholder="Название KK" className="rounded-xl border px-4 py-2" required />
            <input name="nameEn" placeholder="Название EN" className="rounded-xl border px-4 py-2" required />
          </div>
          <Button type="submit" className="mt-4 rounded-full">Сохранить</Button>
        </form>

        <div className="grid gap-4">
          {products.map((p) => {
            const name = (() => { try { return JSON.parse(p.name).ru; } catch { return p.slug; } })();
            return (
              <Card key={p.id}>
                <CardContent className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="font-semibold">{name}</div>
                    <div className="text-sm text-muted-foreground">{p.brand} {p.model} — {p.price} KZT</div>
                  </div>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={p.id} />
                    <Button type="submit" variant="destructive" size="sm" className="rounded-full">Удалить</Button>
                  </form>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

async function upsertProductWrapper(formData: FormData) {
  "use server";
  const { upsertProduct } = await import("@/lib/actions");
  await upsertProduct(formData);
}
