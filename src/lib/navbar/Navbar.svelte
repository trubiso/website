<script lang="ts">
	import { navbar } from '$lib/json';
import NavbarElement from './NavbarElement.svelte';

	const items = navbar.order;
</script>

<main>
	{#each items as item}
		<NavbarElement name={item} />
	{/each}
</main>
