import { getCases } from "@/lib/data";
import { Locale, getLocalized } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const cases = await getCases(locale);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Кейсы клиентов</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Реальные истории установки и настройки умных замков.</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cases.map((c: any, i: number) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">{getLocalized(c.title, locale)}</h2>
                <p className="mt-2 text-muted-foreground">{getLocalized(c.summary, locale)}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{c.clientName}</span>
                  <span>{c.location}</span>
                </div>
                {c.rating && (
                  <div className="mt-2 flex items-center gap-1 text-amber-500">
                    {Array.from({ length: c.rating }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current" />)}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
