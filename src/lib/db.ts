import { PrismaClient } from '@prisma/client';

export default async function getPrisma() : Promise<PrismaClient> {
	const prisma = new PrismaClient();
	await prisma.$connect().then(() => {
		console.log('Connected to Prisma!');
	});
	return prisma;
}
