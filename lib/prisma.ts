import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; // ⬅️ Le fameux adaptateur

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 🚨 L'ARCHITECTURE PRISMA V7 🚨
// 1. On prépare l'adaptateur avec notre lien Neon
const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL! 
});

// 2. On donne cet adaptateur au client
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter // ⬅️ Plus de "datasources", on passe juste l'adaptateur !
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;