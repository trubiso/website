import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	const tag = url.searchParams.get('tag');
	let fetchUrl = '/api/bug';
	if (tag) fetchUrl += `?tag=${tag}`;
	const bugs = await fetch(fetchUrl);
	return { ...(await bugs.json()), tag };
};
