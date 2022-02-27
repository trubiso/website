<script lang="ts">
	import { emoteLinks, emoteNames } from './vars';
	export let name = 'happy';
	export let size = '22';
	export let spinning = false;
	const link = emoteLinks[emoteNames.findIndex((e) => e === name)];
</script>

<div class="emote">
	<img src={link} alt={name} height={size} class:spinning />
</div>

<style lang="scss">
	@import '../styles/keyframes';

	.emote {
		display: inline;
		img {
			vertical-align: middle;
			line-height: normal;

			&.spinning {
				animation: spinScale 0.5s infinite linear;
			}
		}
	}
</style>
