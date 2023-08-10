<!--TODO: make a proper grid-->
<!--TODO: ask for q+a-y grid or issues-y grid -->
<!--TODO: ask for possible sorts & stuff-->
<!--TODO: ask for possible filters-->
<!--TODO: ask if wants searchbar-->
<!--TODO: ask if wants pages-->
<!--TODO: add config menu to add these back-->

<script lang="ts">
	import type { SvelteComponent } from "svelte";

	export let data: { [key: string]: any }[];
	export let renderComponent: typeof SvelteComponent;
</script>

<main class="strainer">
	<ul>
		{#each data as entry}
			<li><svelte:component this={renderComponent} {...entry}/></li>
		{/each}
	</ul>
</main>
