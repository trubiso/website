import prisma from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	return {
		status: 200,
		body: {
			message: "halo"
		}
	};
};

export const post: RequestHandler = async ({ request }) => { 
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
