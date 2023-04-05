import prisma from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';
import * as uuid from 'uuid';

export const POST: RequestHandler = async ({ request }) => {
	const json = await request.json();
	const name = (json.name as string).trim();
	const description = (json.description as string).trim();
	const tags = (json.tags as string[]).map((x) => x.trim());

	if (name.length < 1)
		return new Response(JSON.stringify({ success: false, error: 'name missing' }));
	
	if (description.length < 1)
		return new Response(JSON.stringify({ success: false, error: 'name missing' }));
	
	if (tags.some((x) => x.length < 1))
		return new Response(JSON.stringify({ success: false, error: 'empty tag' }));

	const id = uuid.v4();
	
	try {
		await prisma.bug.create({
			data: {
				id,
				name,
				description,
				tags,
			}
		});
	} catch (e) {
		return new Response(JSON.stringify({ success: false, error: e }));
	}

	return new Response(JSON.stringify({ success: true }));
};

export const GET: RequestHandler = async ({ url }) => {
	let bugs = await prisma.bug.findMany({
		where: { approved: true },
		orderBy: { created_at: 'desc' }
	});

	if (url.searchParams.has('tag')) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const tag = url.searchParams.get('tag')!;
		bugs = bugs.filter((x) => x.tags.includes(tag));
	}

	return new Response(
		JSON.stringify({
			bugs
		}),
		{
			status: 200,
			headers: new Headers({ 'Content-Type': 'application/json' })
		}
	);
};
