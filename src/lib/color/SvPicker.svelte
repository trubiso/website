<script lang="ts">
	import { HSVtoHEX } from '$lib/color';
	import { createEventDispatcher } from 'svelte';
	import Pointer from './Pointer.svelte';

	import './SvPicker.scss';
	export let hue = 0;
	export let sat = 0;
	export let val = 0;

	$: pickerBG = HSVtoHEX(hue, 1, 1);

	const dispatch = createEventDispatcher();
	function change() {
		dispatch('change');
	}
</script>

<main>
	<div class="sv-picker" style="--picker-bg: {pickerBG};">
		<div class="sv-picker-bg">
			<Pointer
				x={sat * 360}
				y={(1 - val) * 300}
				width="360"
				height="300"
				xOffset={-7.5}
				yOffset={-7.5}
				irelY
				bind:relX={sat}
				bind:relY={val}
				noRound
				on:change={change}
			/>
		</div>
		<div class="sv-picker-white" />
		<div class="sv-picker-black" />
	</div>
	<div class="sv-picker-filler" />
</main>
