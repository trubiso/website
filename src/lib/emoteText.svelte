<script lang="ts">
	import Emote from './emote.svelte';
	import { emoteNames } from './vars';

	export let text: string;
	export let size = '22';
	export let html = false;

	const joinedNames = emoteNames.join('|');
	const regex = new RegExp(`:(${joinedNames}):`, 'g');

	const splitText: string[] = text.split(regex).filter((v) => v);
	let emoteText = splitText.map((v) => ({ text: v, emote: emoteNames.includes(v) }));
</script>

<span>
	{#if html}
		{#each emoteText as e}
			{#if e.emote}
				<Emote name={e.text} {size} />
			{:else}
				{@html e.text}
			{/if}
		{/each}
	{:else}
		{#each emoteText as e}
			{#if e.emote}
				<Emote name={e.text} {size} />
			{:else}
				{e.text}
			{/if}
		{/each}
	{/if}
</span>
