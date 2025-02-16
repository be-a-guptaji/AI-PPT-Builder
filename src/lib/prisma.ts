import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// If prisma is already initialized (for development), reuse it
export const client = globalThis.prisma || new PrismaClient();

// Assign the client to globalThis in development to reuse the same instance
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

export default client;
