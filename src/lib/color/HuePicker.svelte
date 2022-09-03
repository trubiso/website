<script lang="ts">
	import { HSVtoHEX } from '$lib/color';

	import './HuePicker.scss';
	import Pointer from './Pointer.svelte';

	export let hue = 0;
	export let sat = 0;
	export let val = 0;

	const degs = [0, 60, 120, 180, 240, 300, 360];
	$: pDegs = degs.map((v) => HSVtoHEX(v, sat, val));
</script>

<main>
	<div class="hue-picker" style="background: linear-gradient(to right, {pDegs.join(', ')});">
		<Pointer x={hue} width="360" mrel="360" bind:relX={hue} />
	</div>

	<div class="hue-picker-filler" />
</main>
