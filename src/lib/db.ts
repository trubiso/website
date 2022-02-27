import pkg from '@prisma/client';
const prisma = new pkg.PrismaClient();
prisma.$connect().then(() => {
	console.log('Connected to Prisma!');
});

export default prisma;
