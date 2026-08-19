"use client";

export default function MapPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Зоны доставки и установки</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Доставляем и устанавливаем замки по Алматы и другим городам Казахстана.</p>

        <div className="mt-12 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-graySoft shadow-soft">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121094.18860577442!2d76.822744!3d43.238949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836ea5c8d3dfbf%3A0x1b5b9a5e4d5c5c4!2sAlmaty!5e0!3m2!1sen!2skz!4v1`}
            className="h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border p-6">
            <h3 className="font-semibold">Алматы</h3>
            <p className="mt-2 text-sm text-muted-foreground">Доставка и установка в день заказа.</p>
          </div>
          <div className="rounded-2xl border border-border p-6">
            <h3 className="font-semibold">Астана, Шымкент</h3>
            <p className="mt-2 text-sm text-muted-foreground">Доставка 1-2 дня, установка по записи.</p>
          </div>
          <div className="rounded-2xl border border-border p-6">
            <h3 className="font-semibold">Весь Казахстан</h3>
            <p className="mt-2 text-sm text-muted-foreground">Отправляем курьерскими службами.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
