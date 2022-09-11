<script lang="ts">
	import { HEXtoRGB, RGBtoHEX } from '$lib/color';
	import { createEventDispatcher } from 'svelte';

	import '../Picker.scss';

	import HexPicker from './HexPicker.svelte';
	import RgbPicker from './RgbPicker.svelte';

	export let hex = '#000000';

	let r = 0,
		g = 0,
		b = 0;

	function syncHEX() {
		const newHex = RGBtoHEX(r, g, b);
		hex = newHex;
		changeIntHex(newHex);
		change();
	}

	function syncRGB() {
		[r, g, b] = HEXtoRGB(hex);
		change();
	}

	let changeIntHex: (newHex: string) => {};

	export function importHEX(newHex: string) {
		hex = newHex;
		changeIntHex(hex);
		[r, g, b] = HEXtoRGB(hex);
	}

	const dispatch = createEventDispatcher();
	function change() {
		dispatch('change');
	}
</script>

<main>
	<div class="picker">
		<div class="picker-wrap">
			<RgbPicker bind:r bind:g bind:b on:change={syncHEX} />
		</div>
		<div class="picker-wrap">
			<HexPicker bind:hex bind:changeIntHex on:change={syncRGB} />
		</div>
	</div>
</main>
