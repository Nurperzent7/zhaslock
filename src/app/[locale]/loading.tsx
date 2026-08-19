import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative -mt-16 min-h-[100svh] bg-[#06090f] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220] via-[#06090f] to-[#0e7c86]/20" />
      <div className="relative z-10 flex min-h-[100svh] items-center px-4 py-28 lg:px-8">
        <div className="container mx-auto max-w-5xl space-y-6">
          <Skeleton className="h-16 w-64 rounded-2xl bg-white/10" />
          <Skeleton className="h-8 w-full max-w-xl rounded-xl bg-white/10" />
          <Skeleton className="h-5 w-full max-w-md rounded-lg bg-white/10" />
          <div className="flex flex-wrap gap-3 pt-2">
            <Skeleton className="h-12 w-36 rounded-full bg-white/15" />
            <Skeleton className="h-12 w-52 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
