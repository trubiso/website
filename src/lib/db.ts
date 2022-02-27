import pkg from '@prisma/client';

export default async function getPrisma() : Promise<pkg.PrismaClient> {
	const prisma = new pkg.PrismaClient();
	await prisma.$connect().then(() => {
		console.log('Connected to Prisma!');
	});
	return prisma;
}
