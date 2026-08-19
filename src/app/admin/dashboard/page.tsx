import Link from "next/link";
import { getDashboardStats } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const links = [
    { href: "/admin/dashboard/products", label: "Товары", value: stats.products },
    { href: "/admin/dashboard/articles", label: "Академия установки", value: stats.articles },
    { href: "/admin/dashboard/videos", label: "Видеоуроки", value: stats.videos },
    { href: "/admin/dashboard/orders", label: "Заказы", value: stats.orders },
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">Панель управления</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Контент, товары и заявки. Вход: admin@zhaslock.kz
            </p>
          </div>
          <form action="/api/auth/signout" method="post">
            <Button type="submit" variant="outline">
              Выйти
            </Button>
          </form>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <Card className="h-full transition-shadow hover:shadow-glass">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">{l.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{l.value}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
