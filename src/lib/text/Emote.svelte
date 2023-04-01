<script lang="ts">
	import { getEmote } from '$lib/functions';
	import './Emote.scss';

	export let name: string;
	export let spinning = false;
	export let scaling = false;
	$: url = getEmote(name);
</script>

<img
	class="emote"
	class:spinning={spinning && !scaling}
	class:scaling={!spinning && scaling}
	class:spinning-scaling={spinning && scaling}
	src={url}
	alt=":{name}:"
/>
