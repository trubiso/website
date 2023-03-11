import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	const page = url.searchParams.get('page') || 1;
	const qa = await fetch(`/api/q+a?page=${page}`);
	return { ...(await qa.json()), currentPage: page };
};
