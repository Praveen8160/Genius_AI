import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prismadb = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "development") globalForPrisma.prisma = prismadb;

export default prismadb;