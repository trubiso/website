import { DATABASE_URL } from '$env/static/private';
import { PrismaClient } from '@prisma/client/edge';

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: DATABASE_URL
		}
	}
});

export default prisma;
