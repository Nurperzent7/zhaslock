import { PrismaClient } from "@prisma/client";

const DATABASE_URL_KEY = "DATABASE_URL";
const DEFAULT_SQLITE_URL = "file:./prisma/dev.db";

// Next.js replaces process.env.DATABASE_URL with a literal at build time, so
// assign through bracket access + globalThis (Prisma checks globalThis first).
const globalEnv = globalThis as unknown as Record<string, string | undefined>;
const databaseUrl = process.env[DATABASE_URL_KEY] || globalEnv[DATABASE_URL_KEY] || DEFAULT_SQLITE_URL;

process.env[DATABASE_URL_KEY] = databaseUrl;
globalEnv[DATABASE_URL_KEY] = databaseUrl;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
