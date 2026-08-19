"use client";

import { Instagram, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "77016050667";
const instagram =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/lockstore_astana";
const tiktok =
  process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@lock_store__";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.8a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.79a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const items = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${whatsapp}`,
    icon: MessageCircle,
  },
  {
    label: "Instagram",
    href: instagram,
    icon: Instagram,
  },
  {
    label: "TikTok",
    href: tiktok,
    icon: TikTokIcon,
  },
] as const;

export function SocialLinks({
  className,
  iconClassName,
  variant = "dark",
}: {
  className?: string;
  iconClassName?: string;
  variant?: "dark" | "light";
}) {
  return (
    <div className={cn("flex gap-3", className)}>
      {items.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            "rounded-full p-2.5 transition-colors",
            variant === "dark"
              ? "border border-white/15 text-white/80 hover:border-teal-300/50 hover:text-teal-300"
              : "border border-border bg-card text-foreground hover:border-accent/40 hover:text-accent",
            iconClassName
          )}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
