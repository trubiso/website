import { PrismaClient as PrismaClientEdge } from '@prisma/client/edge';
import { PrismaClient } from '@prisma/client';

const prisma = new (
	process && process.env.IS_LOCAL && process.env.IS_LOCAL === 'true' ? PrismaClient : PrismaClientEdge
)();

prisma.$connect().then(() => console.log('Connected to Prisma'));

export default prisma;
