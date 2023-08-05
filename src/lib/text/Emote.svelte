<script lang="ts">
	import { getEmote } from '$lib/functions';
	import './Emote.scss';

	export let name: string;
	export let spinning = false;
	export let scaling = false;
	export let size: string | null = null;
	$: url = getEmote(name);
</script>

<img
	class="emote"
	class:spinning={spinning && !scaling}
	class:scaling={!spinning && scaling}
	class:spinning-scaling={spinning && scaling}
	class:use-size={size !== null}
	style="--size: {size}px"
	src={url}
	alt=":{name}:"
/>
