<script lang="ts">
	import { emoteLinks, emoteNames } from './vars';
	export let name = 'happy';
	export let size = '22';
	const link = emoteLinks[emoteNames.findIndex((e) => e === name)];
</script>

<div class="emote">
	<img src={link} alt={name} height={size} />
</div>

<style>
	.emote {
		display: inline;
	}
	.emote img {
		vertical-align: middle;
		line-height: normal;
	}
</style>
