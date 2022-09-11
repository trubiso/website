<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import HsvManualPicker from './HsvManualPicker.svelte';

	import { HEXtoHSV } from '$lib/color';
	import '../Picker.scss';
	import HuePicker from './HuePicker.svelte';
	import SvPicker from './SvPicker.svelte';

	export let hue = 47,
		sat = 100,
		val = 100;

	const dispatch = createEventDispatcher();
	function syncChange() {
		syncShown();
		change();
	}

	function change() {
		dispatch('change');
	}

	export function importHSV(h: number, s: number, v: number) {
		[hue, sat, val] = [h, s, v];
		syncShown();
	}

	let syncShown: () => {};
</script>

<main>
	<div class="picker">
		<div class="picker-wrap">
			<SvPicker {hue} bind:sat bind:val on:change={syncChange} />
		</div>
		<div class="picker-wrap">
			<HuePicker bind:hue {sat} {val} on:change={syncChange} />
		</div>
		<div class="picker-wrap">
			<HsvManualPicker bind:hue bind:sat bind:val bind:syncShown on:change={change} />
		</div>
	</div>
</main>
