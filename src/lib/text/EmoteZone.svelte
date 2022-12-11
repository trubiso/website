<script lang="ts">
	import './EmoteZone.scss';
	import { emotes } from '$lib/json';
	import { onMount } from 'svelte';

	export let size = '22';

	let slotObj: HTMLElement;
	onMount(() => {
		slotObj.innerHTML = slotObj.innerHTML.replace(/:[0-9a-zA-Z_]{2,32}?:/g, (v) => {
			const emoteName = v.slice(1, -1);
			const emoteIdx = emotes.emoteNames.findIndex((v) => v === emoteName);
			const emoteUrl = emotes.emoteLinks[emoteIdx];
			return `<span class="emote"><img src="${emoteUrl}" alt="${v}" title="${v}" height="${size}"></span>`;
		});
	});
</script>

<span bind:this={slotObj}><slot /></span>
