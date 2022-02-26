<script lang="ts">
	import { theme, lang, getTextCollection } from './vars';

	let cl = 0,
		ct = 0;
	lang.subscribe((v) => {
		cl = v;
	});
	theme.subscribe((v) => {
		ct = v;
	});

	const themes = getTextCollection('themes');
	function switchTheme(i: number) {
		theme.set(i);
	}
</script>

<div class="picker">
	<br />
	{#each themes[cl] as theme, i}
		<a
			href="#h"
			style="font-weight:{ct === i ? 'bold' : 'normal'}"
			on:click|preventDefault={() => switchTheme(i)}>{theme}</a
		><br /><br />
	{/each}
</div>

<style>
	.picker {
		margin: 0 auto;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.picker a {
		text-decoration: none;
		color: white;
		font-size: 14pt;
	}
</style>
