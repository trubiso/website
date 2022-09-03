<script lang="ts">
	import { HSVtoRGB } from '$lib/color';
	import HsvPicker from './HsvPicker.svelte';

	
	//export let color = '#000000';

	let newColor = '#000000';

	let open = false;

	function toggle() {
		open = !open;
	}

	let hue = 40,
		sat = 1,
		val = 1;
</script>

<main>
	<div class="color-picker">
		<input type="color" on:click|preventDefault={toggle} />
		<div class="color-picker-box">
			{hue.toFixed(0)}°
			{(sat * 100).toFixed(1)}%
			{(val * 100).toFixed(1)}%
			<div
				style="width: 50px; height: 50px; background-color: rgb({HSVtoRGB(hue, sat, val).join(
					','
				)});"
			/>
			<br />
			<HsvPicker bind:hue bind:sat bind:val />
			<!--TODO: separate hue and sv to separate comp-->
			<!--TODO: conversion to rgb & hex-->
			<!--TODO: open when color button is clicked-->
			<!--TODO: sync all colors-->
			<!--todo: sleep (it's 2:32 am at the time of writing)-->
		</div>
	</div>
</main>
