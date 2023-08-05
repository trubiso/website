<script lang="ts">
	import { apl } from '$lib/functions';
	import { t } from '$lib/localization';
	import Emote from '$lib/text/Emote.svelte';
</script>

<main>
	<h1>{$t('homeStable.title')} <Emote name="happy" size="44" /></h1>
	<span>{$t('homeStable.reasonsPre')} <Emote name="nerd_emotiguy" size="22" /></span>
	<ol>
		{#each new Array(6) as a, i}
			<li>{$t(apl('homeStable', `.reason${i + 1}`))}</li>
		{/each}
	</ol>
	<p />
	<img src="/likangel.png" alt="" width="256" />
</main>

<style>
	h1 {
		width: 100%;
	}
</style>
