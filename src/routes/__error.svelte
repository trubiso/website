<script context="module">
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	export function load({ status }) {
		return {
			props: {
				title: `${status}`
			}
		};
	}
</script>

<script lang="ts">
	import Emote from '$lib/emote.svelte';
	import { getTextCollection, lang } from '$lib/vars';

	export let title;
	let cl;
	lang.subscribe((v) => {
		cl = v;
	});

	const error = getTextCollection('error');
</script>

<main>
	<h1>{error[cl][0]} {title} !!! <Emote name="shock" size="44" /></h1>
	{#if title === '404'}
		{error[cl][1]}
		<Emote name="allifeelispain" /><br />
		{error[cl][2]}
		<Emote name="happy" /><br />
		{error[cl][3]}
		<Emote name="shock_handless" /><br />
		{error[cl][4]}
		<Emote name="glad" /><br /><br />
		{error[cl][5]}
		<Emote name="sad" /><Emote name="sad2" /><Emote name="sad" /><br />
		{error[cl][6]}
		<Emote name="excited" /><Emote name="excited_jumping" />
	{:else}
		{error[cl][7]} <Emote name="think" /><Emote name="silly" />
	{/if}
</main>
