<script lang="ts">
	import { HSVtoRGB } from '$lib/color';
	import HsvPicker from './hsv/HsvPicker.svelte';
	import RgbHexPicker from './rgbhex/RgbHexPicker.svelte';

	//export let color = '#000000';

	let newColor = '#000000';

	let open = false;

	function toggle() {
		open = !open;
	}

	let hue = 40,
		sat = 100,
		val = 100;
</script>

<main>
	<div class="color-picker">
		<input type="color" on:click|preventDefault={toggle} />
		<div class="color-picker-box">
			{hue.toFixed(0)}°
			{(sat).toFixed(1)}%
			{(val).toFixed(1)}%
			<div
				style="width: 50px; height: 50px; background-color: rgb({HSVtoRGB(hue, sat, val).join(
					','
				)});"
			/>
			<br />
			<div class="hsv-picker-wrap">
				<HsvPicker bind:hue bind:sat bind:val />
			</div>
			<div class="rgb-hex-wrap">
				<RgbHexPicker />
			</div>
			<!--TODO: conversion to rgb & hex-->
			<!--TODO: open when color button is clicked-->
			<!--TODO: sync all colors-->
			<!--todo: sleep (it's 2:32 am at the time of writing)-->
		</div>
	</div>
</main>
