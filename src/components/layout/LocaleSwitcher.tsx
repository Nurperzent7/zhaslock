"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const locales = [
  { code: "ru", label: "RU" },
  { code: "kk", label: "KK" },
  { code: "en", label: "EN" },
];

export function LocaleSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const current = pathname.split("/")[1] || "ru";

  const handleSwitch = (locale: string) => {
    const rest = pathname.split("/").slice(2).join("/");
    router.push(`/${locale}${rest ? `/${rest}` : ""}`);
  };

  return (
    <div className={cn("flex items-center rounded-full bg-muted p-1", className)}>
      {locales.map((l) => (
        <Button
          key={l.code}
          type="button"
          variant={current === l.code ? "default" : "ghost"}
          size="sm"
          onClick={() => handleSwitch(l.code)}
          className="h-7 rounded-full px-2 text-xs"
          aria-label={l.label}
        >
          {l.label}
        </Button>
      ))}
    </div>
  );
}
