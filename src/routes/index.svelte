<script lang="ts">
	import Emote from '$lib/emote.svelte';
	import { getTextCollection, lang } from '$lib/vars';
	const reasons = getTextCollection('index.reasons');
	const texts = getTextCollection('index.texts');

	const names = getTextCollection('sidebar.item_names');

	let cl = 0;

	lang.subscribe((v) => {
		cl = v;
	});
</script>

<svelte:head>
	<title>{names[cl][0]}</title>
</svelte:head>

<section>
	<h1>{texts[cl][0]} <Emote name="happy" size="44" /></h1>
	<span> {texts[cl][1]} <Emote name="nerd_emotiguy" /> </span>
	<ol>
		{#each reasons[cl] as reason}
			<li>{reason}</li>
		{/each}
	</ol>
	<p />
	<img src="/likangel.png" alt="" width="256" />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* align-items: center; */
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
