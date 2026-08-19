import Image from "next/image";

const works = [
  { src: "/products/h4-fv-black.png", title: "SHARP H4-FV" },
  { src: "/products/h4-fv-gold.png", title: "SHARP H4-FV — бронза" },
  { src: "/products/h4-fv-rose.png", title: "SHARP H4-FV — rose gold" },
  { src: "/products/x9.png", title: "MY HOME X9" },
  { src: "/products/s008.png", title: "S008 Tuya / TTLock" },
  { src: "/products/qleung.png", title: "QLEUNG 3D Face" },
];

export default function GalleryPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Галерея выполненных работ</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Примеры установки умных замков в квартирах, домах и офисах.</p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-3xl bg-[#0b1220]">
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
