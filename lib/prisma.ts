import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Avoid instantiating multiple clients in development (hot reloads)
declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

// Build adapter from DATABASE_URL (pg PoolConfig supports connectionString)
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "Missing DATABASE_URL environment variable. Set it to your Postgres connection string, e.g. postgres://user:pass@localhost:5432/dbname"
  );
}

const pgAdapterFactory = new PrismaPg({ connectionString: databaseUrl });

export const prisma =
  globalThis.__prisma__ ??
  new PrismaClient({ adapter: pgAdapterFactory } as any);
if (process.env.NODE_ENV !== "production") globalThis.__prisma__ = prisma;
