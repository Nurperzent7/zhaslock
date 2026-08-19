import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
  }
  interface Session {
    user: User & { id?: string; role?: string };
  }
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

async function authorizeFromDb(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user?.password) return null;
    const ok = await compare(password, user.password);
    if (!ok) return null;
    return { id: user.id, email: user.email, name: user.name, role: user.role || "ADMIN" };
  } catch {
    return null;
  }
}

function authorizeFromEnv(email: string, password: string) {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@zhaslock.kz").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "admin12345";
  if (email.toLowerCase() !== adminEmail) return null;
  if (password !== adminPassword) return null;
  return {
    id: "env-admin",
    email: adminEmail,
    name: "Admin",
    role: "ADMIN",
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const fromDb = await authorizeFromDb(email, password);
        if (fromDb) return fromDb;
        return authorizeFromEnv(email, password);
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        (token as any).id = user.id;
        (token as any).role = user.role;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user.id = (token as any).id as string;
        session.user.role = (token as any).role as string;
      }
      return session;
    },
  },
});
