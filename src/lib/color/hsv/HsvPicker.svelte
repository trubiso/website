<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import HsvManualPicker from './HsvManualPicker.svelte';

	import './HsvPicker.scss';
	import HuePicker from './HuePicker.svelte';
	import SvPicker from './SvPicker.svelte';

	export let hue = 47,
		sat = 100,
		val = 100;

	const dispatch = createEventDispatcher();
	function change() {
		syncShown();
		dispatch('change');
	}

	let syncShown: () => {};
</script>

<main>
	<div class="hsv-picker">
		<div class="sv-picker-wrap">
			<SvPicker {hue} bind:sat bind:val on:change={change} />
		</div>
		<div class="hue-picker-wrap">
			<HuePicker bind:hue {sat} {val} on:change={change} />
		</div>
		<div class="hsv-manual-wrap">
			<HsvManualPicker bind:hue bind:sat bind:val bind:syncShown on:change={change} />
		</div>
	</div>
</main>
