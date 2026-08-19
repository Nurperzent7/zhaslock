import Image from "next/image";

const works = [
  { src: "https://images.unsplash.com/photo-1582050134757-565e361a89ef?auto=format&fit=crop&w=800&q=80", title: "Smart Lock Pro" },
  { src: "https://images.unsplash.com/photo-1585338107529-13afc5f02542?auto=format&fit=crop&w=800&q=80", title: "Yale Lyra" },
  { src: "https://images.unsplash.com/photo-1581578731117-104f2a6b8722?auto=format&fit=crop&w=800&q=80", title: "Aqara A100" },
  { src: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80", title: "Xiaomi M30" },
  { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80", title: "Дом в Алматы" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", title: "Офис" },
];

export default function GalleryPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Галерея выполненных работ</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Примеры установки умных замков в квартирах, домах и офисах.</p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-3xl bg-graySoft">
              <Image src={w.src} alt={w.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-lg font-semibold text-white">{w.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
