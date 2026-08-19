import Image from "next/image";

const works = [
  { src: "/products/s008.jpg", title: "S008 — 75 000 ₸" },
  { src: "/products/s009.jpg", title: "S009 Black — 80 000 ₸" },
  { src: "/products/a11-ultra.jpg", title: "A11 ULTRA — 90 000 ₸" },
  { src: "/products/s958.jpg", title: "QLEUNG S958 — 100 000 ₸" },
  { src: "/products/r15-pro.jpg", title: "R15 PRO — 140 000 ₸" },
  { src: "/products/q8-pro-black.jpg", title: "Q8 PRO Black — 150 000 ₸" },
  { src: "/products/q8-pro-bronze.jpg", title: "Q8 PRO Bronze — 150 000 ₸" },
  { src: "/products/h4-fv-black.jpg", title: "SHARP H4 — 185 000 ₸" },
  { src: "/products/h4-fv-gold.jpg", title: "SHARP H4 Gold — 195 000 ₸" },
];

export default function GalleryPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Галерея выполненных работ</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Примеры установки умных замков в квартирах, домах и офисах.</p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-3xl bg-white">
              <Image src={w.src} alt={w.title} fill className="object-contain p-6 transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
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
