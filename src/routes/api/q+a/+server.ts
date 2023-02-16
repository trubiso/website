import prisma from '$lib/db';
import type { RequestEvent } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const GET = async ({ url }: RequestEvent) => {
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
			hasNextPage
		}),
		{
			status: 200,
			headers: new Headers({ 'Content-Type': 'application/json' })
		}
	);
};
