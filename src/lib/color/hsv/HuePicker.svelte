<script lang="ts">
	import { HSVtoHEX } from '$lib/color';
	import { createEventDispatcher } from 'svelte';

	import './HuePicker.scss';
	import Pointer from './Pointer.svelte';

	export let hue = 0;
	export let sat = 0;
	export let val = 0;

	const degs = [0, 60, 120, 180, 240, 300, 360];
	$: pDegs = degs.map((v) => HSVtoHEX(v, sat, val));

	let cw = 360;

	const dispatch = createEventDispatcher();
	function change() {
		dispatch('change');
	}
</script>

<main>
	<div class="hue-picker" bind:clientWidth={cw} style="background: linear-gradient(to right, {pDegs.join(', ')});">
		<Pointer x={hue * cw / 360} width="{cw}" mrel="360" bind:relX={hue} on:change={change} />
	</div>

	<div class="hue-picker-filler" />
</main>
