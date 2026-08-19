import { getOrders } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-semibold">Заказы</h1>
        <div className="space-y-4">
          {orders.map((order: any) => (
            <Card key={order.id}>
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{order.customerName}</div>
                    <div className="text-sm text-muted-foreground">{order.phone}</div>
                  </div>
                  <div className="text-sm font-medium">{order.status}</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{order.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
