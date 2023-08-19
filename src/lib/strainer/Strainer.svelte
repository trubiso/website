<!--TODO: make a proper grid-->
<!--TODO: ask for q+a-y grid or issues-y grid -->
<!--TODO: ask for possible sorts & stuff-->
<!--TODO: ask for possible filters-->
<!--TODO: ask if wants searchbar-->
<!--TODO: ask if wants pages-->
<!--TODO: add config menu to add these back-->

<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import './Strainer.scss';

	export let data: { [key: string]: any }[];
	export let renderComponent: typeof SvelteComponent;

	let gridType: 'h' | 'v' = 'v';
</script>

<main class="strainer">
	<button on:click={() => (gridType = gridType === 'h' ? 'v' : 'h')}
		>switch grid, curr = {gridType}</button
	>
	<div class="strainer-grid grid-{gridType}">
		{#each data as entry}
			<div class="grid-entry">
				<svelte:component this={renderComponent} {...entry} />
			</div>
		{/each}
	</div>
</main>
