<script lang="ts">
	import { padZeroes } from '$lib/functions';

	export let name: string;
	export let link: string;
	export let i: number;
</script>

<main>
	<h1><code>#{padZeroes(i, 3)}</code> {name}</h1>
	<img src="{link}" alt=":{name}:">
</main>
