import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Next.js inlines process.env.DATABASE_URL at build time. Set a SQLite default
// here so Vercel can build without a dashboard env var.
process.env.DATABASE_URL ??= "file:./prisma/dev.db";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  typedRoutes: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "40mb",
    },
  },
};

export default withNextIntl(nextConfig);
