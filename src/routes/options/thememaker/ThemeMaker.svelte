<script>
	import { order } from '$lib/json';
	import ThemeIo from './ThemeIo.svelte';
	import ThemeMakerPick from './ThemeMakerPick.svelte';
</script>

<main>
	{#each order.themeProps as themeProp}
		<ThemeMakerPick prop={themeProp} />
	{/each}
	<ThemeIo />
</main>
