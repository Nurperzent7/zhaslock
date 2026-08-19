"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function ProductSort({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const t = useTranslations("products.sort");

  const setSort = (sort: string) => {
    const sp = new URLSearchParams(params.toString());
    sp.set("sort", sort);
    router.push(`${pathname}?${sp.toString()}`);
  };

  return (
    <Select value={params.get("sort") || "newest"} onValueChange={setSort}>
      <SelectTrigger className={cn("w-[180px] rounded-full", className)}>
        <SelectValue placeholder={t("newest")} />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectItem value="newest">{t("newest")}</SelectItem>
        <SelectItem value="popular">{t("popular")}</SelectItem>
        <SelectItem value="priceAsc">{t("priceAsc")}</SelectItem>
        <SelectItem value="priceDesc">{t("priceDesc")}</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function ProductFilters({ brands, className }: { brands: string[]; className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const t = useTranslations("products");

  const update = (key: string, value: string) => {
    const sp = new URLSearchParams(params.toString());
    if (value) sp.set(key, value);
    else sp.delete(key);
    router.push(`${pathname}?${sp.toString()}`);
  };

  const features = ["Fingerprint", "WiFi", "Bluetooth", "Face Recognition", "Camera", "RFID"];

  return (
    <div className={cn("space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft", className)}>
      <h3 className="font-semibold">{t("filters.title")}</h3>

      <div>
        <label className="mb-2 block text-sm font-medium">{t("filters.brand")}</label>
        <Select value={params.get("brand") || ""} onValueChange={(v) => update("brand", v)}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder={t("filters.brand")} />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="">{t("filters.brand")}</SelectItem>
            {brands.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">{t("filters.features")}</label>
        <div className="flex flex-wrap gap-2">
          {features.map((f) => {
            const active = params.get("feature") === f;
            return (
              <Button
                key={f}
                type="button"
                variant={active ? "default" : "outline"}
                size="sm"
                onClick={() => update("feature", active ? "" : f)}
                className="rounded-full text-xs"
              >
                {f}
              </Button>
            );
          })}
        </div>
      </div>

      <Button variant="outline" className="w-full rounded-full" onClick={() => router.push(pathname)}>
        {t("filters.title")} — {t("sort.newest")}
      </Button>
    </div>
  );
}
