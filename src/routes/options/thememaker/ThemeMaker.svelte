<script>
	import { order } from '$lib/json';
	import ThemeMakerPick from './ThemeMakerPick.svelte';
</script>

<main>
	{#each order.themeProps as themeProp}
		<ThemeMakerPick prop={themeProp} />
	{/each}
</main>
