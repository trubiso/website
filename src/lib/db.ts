import Prisma, * as PrismaScope from '@prisma/client';
const PrismaClient = Prisma?.PrismaClient || PrismaScope.PrismaClient;

const prisma = new PrismaClient();
prisma.$connect().then(() => console.log('Connected to Prisma'));

export default prisma;
