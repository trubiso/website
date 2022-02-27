<script lang="ts">
	import { lang, getTextCollection } from '../vars';
	import { slide } from 'svelte/transition';

	const langs = getTextCollection('langs');
	function switchLang(i: number) {
		lang.set(i);
	}
</script>

<div class="picker" transition:slide>
	{#each langs as language, i}
		<div class:bold={$lang === i} on:click|preventDefault={() => switchLang(i)}>{language}</div>
	{/each}
</div>
