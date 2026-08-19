"use client";

import { Phone } from "lucide-react";

export function CallButton() {
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+77016050667";
  return (
    <a
      href={`tel:${phone.replace(/\s/g, "")}`}
      className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-glass transition-transform hover:scale-110 md:bottom-8 md:right-24"
      aria-label="Call"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
