import { PrismaClient } from '@prisma/client/edge';

const prisma = new PrismaClient(); // this doesn't work locally but i have no way to check whether this is local (otherwise the website just crashes here)

prisma.$connect().then(() => console.log('Connected to Prisma'));

export default prisma;
