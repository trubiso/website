import prisma from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
	const question = (await request.json()).question;
	try {
		await prisma.qa.create({
			data: {
				created_at: new Date(),
				question: question,
				answer: null
			}
		});
		return {
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

export const get: RequestHandler = async () => {
	return {
		body: {
			questions: await prisma.qa.findMany({
				where: {
					NOT: {
						answer: null
					}
				},
				orderBy: {
					created_at: 'desc'
				}
			})
		}
	};
};
