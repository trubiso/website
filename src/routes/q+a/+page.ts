import type { PageLoad } from './$types';
 
export const load: PageLoad = async ({ fetch }) => {
  const qa = await fetch("/api/q+a");
  return await qa.json();
};