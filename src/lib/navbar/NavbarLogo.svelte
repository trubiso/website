<script lang="ts">
	import { mobile } from '$lib/stores';

	import './NavbarLogo.scss';

	let clicks = 0; // easter egg
</script>

<main>
	<div class="logo" class:mobile={$mobile}>
		{#if clicks < 10}
			<img src="/logo.png" alt="logo" on:click={() => clicks++} />
		{:else}
			<img src="/logo.png" alt=":silly:" on:click={() => clicks++} />
			<!--TODO: finish logo (emotes map)-->
		{/if}
	</div>
</main>
