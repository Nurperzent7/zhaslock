"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [selected, setSelected] = useState(0);
  const thumbs = images.length ? images : ["https://placehold.co/800x600?text=No+Image"];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-soft">
        <Image
          src={thumbs[selected]}
          alt={alt}
          fill
          className="object-contain p-6"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {thumbs.length > 1 && (
        <div className="flex gap-3 overflow-auto pb-2">
          {thumbs.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                selected === i ? "border-accent" : "border-transparent"
              }`}
            >
              <Image src={img} alt={`${alt} ${i + 1}`} fill className="object-contain bg-white p-1" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
