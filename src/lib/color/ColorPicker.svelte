<script lang="ts">
	import { HSVtoRGB } from '$lib/color';

	import HuePicker from './HuePicker.svelte';
	import SvPicker from './SvPicker.svelte';

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
	<div class="hsv-picker">
		<input type="color" on:click|preventDefault={toggle} />
      <div class="hsv-picker-box">
      {hue.toFixed(0)}°
      {(sat * 100).toFixed(1)}%
      {(val * 100).toFixed(1)}%
      <div
        style="width: 50px; height: 50px; background-color: rgb({HSVtoRGB(hue, sat, val).join(',')});"
      />
      <br />
      <SvPicker {hue} bind:sat bind:val />
      <br />
      <HuePicker bind:hue {sat} {val} />
      {hue}
      <br />
			<!--TODO: separate hue and sv to separate comp-->
			<!--TODO: conversion to rgb & hex-->
			<!--TODO: open when color button is clicked-->
			<!--TODO: sync all colors-->
			<!--todo: sleep (it's 2:32 am at the time of writing)-->
    </div>
	</div>
</main>
