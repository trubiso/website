import prisma from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	return {
		status: 200,
		body: {
			questions: (await prisma.qa.findMany({
				where: {
					NOT: {
						answer: null
					}
				}
			})).sort( (a, b) => a.created_at > b.created_at ? -1 : 1)
		}
	};
};
