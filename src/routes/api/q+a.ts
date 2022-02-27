import getPrisma from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	const prisma = await getPrisma();
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

export const post: RequestHandler = async ({ request }) => { 
	const prisma = await getPrisma();
	const formBody = await request.json();
	try {
		await prisma.qa.create({
			data: {
				created_at: new Date(),
				question: formBody.question,
                answer: null
			}
		});
		return {
			status: 200,
			body: {
				success: true
			}
		};
	} catch (e) {
		return {
			status: 500,
			body: {
				success: false,
				error: e
			}
		};
	}
};
