"use client";

import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const downloads = [
  { title: "Инструкция Aqara A100", size: "2.4 MB", type: "PDF" },
  { title: "Инструкция Yale Lyra", size: "1.8 MB", type: "PDF" },
  { title: "Прошивка Aqara A100", size: "12 MB", type: "Firmware" },
  { title: "Приложение Android", size: "45 MB", type: "App" },
  { title: "Приложение iOS", size: "App Store", type: "App" },
  { title: "Гарантийный талон", size: "0.5 MB", type: "PDF" },
];

export default function DownloadsPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto max-w-4xl px-4 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Центр загрузок</h1>
        <p className="mt-4 text-muted-foreground">Инструкции, прошивки, приложения и документы.</p>

        <div className="mt-12 divide-y rounded-3xl border border-border bg-card shadow-soft">
          {downloads.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">{file.title}</h3>
                  <p className="text-sm text-muted-foreground">{file.type} · {file.size}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full"><Download className="mr-2 h-4 w-4" /> Скачать</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
