import prisma from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const json = await request.json();
	const question = json.question as string;

	if (question.length < 1)
		return new Response(JSON.stringify({ success: false, error: 'question missing' }));

	try {
		await prisma.qa.create({
			data: {
				created_at: new Date(),
				question,
				answer: null
			}
		});
	} catch (e) {
		return new Response(JSON.stringify({ success: false, error: e }));
	}

	return new Response(JSON.stringify({ success: true }));
};

export const GET: RequestHandler = async ({ url }) => {
	const questionsPerPage = 20;
	let page = 1;
	if (url.searchParams.has('page')) page = parseInt(url.searchParams.get('page') || '1');

	const questions = await prisma.qa.findMany({
		where: { NOT: { answer: null } },
		orderBy: { created_at: 'desc' }
	});

	const startQuestion = (page - 1) * questionsPerPage;
	const endQuestion = page * questionsPerPage;
	const questionList = questions.slice(startQuestion, endQuestion);

	const hasPreviousPage = page > 1;
	const hasNextPage = questions.length > page * questionsPerPage;

	return new Response(
		JSON.stringify({
			questions: questionList,
			hasPreviousPage,
			hasNextPage,
			maximumPage: Math.ceil(questions.length / questionsPerPage)
		}),
		{
			status: 200,
			headers: new Headers({ 'Content-Type': 'application/json' })
		}
	);
};
