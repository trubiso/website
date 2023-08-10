<script>
	import { emotes } from "$lib/json";
	import Strainer from "$lib/strainer/Strainer.svelte";
	import Visualizer from "./Visualizer.svelte";

	// const hour = 3600 * 1000;
	// const baseDate = 1691683306992 - hour * 24 * 365 * 2;

	// const data = [
	// 	{
	// 		"name": "Josh",
	// 		"description": "Very human",
	// 		"date": new Date(baseDate - hour * 28 + 3458339)
	// 	},
	// 	{
	// 		"name": "Beth",
	// 		"description": "Drinks water",
	// 		"date": new Date(baseDate + hour - 12334)
	// 	},
	// 	{
	// 		"name": "Rebecca",
	// 		"description": "Wears scarf",
	// 		"date": new Date(baseDate - hour * 24 * 30 + 7426555)
	// 	}
	// ];

	const data = emotes.emoteNames.map((name, i) => {
		const link = emotes.emoteLinks[i];
		return {
			name,
			link,
			i
		};
	});
</script>

<main>
	<Strainer {data} renderComponent={Visualizer} />
</main>