<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import './HsvPicker.scss';
	import HuePicker from './HuePicker.svelte';
	import SvPicker from './SvPicker.svelte';

	export let hue = 47,
		sat = 1,
		val = 1;

	let percentSat = 100;
	let percentVal = 100;

  let satInput: HTMLInputElement;
  let valInput: HTMLInputElement;

	function syncPercents() {
		percentSat = Math.round(sat * 100);
		percentVal = Math.round(val * 100);
		change();
	}

	function syncPercentsMan() {
    if (isNaN(percentSat)) percentSat = 0;
    if (isNaN(percentVal)) percentVal = 0;
    if (percentSat < 0) percentSat = 0;
    if (percentVal < 0) percentVal = 0;
    if (percentSat > 100) percentSat = 100;
    if (percentVal > 100) percentVal = 100;
		sat = percentSat / 100;
		val = percentVal / 100;
		change();
	}

	const dispatch = createEventDispatcher();
	function change() {
		dispatch('change');
	}
</script>

<main>
	<div class="hsv-picker">
		<div class="sv-picker-wrap">
			<SvPicker {hue} bind:sat bind:val on:change={syncPercents} />
		</div>
		<div class="hue-picker-wrap">
			<HuePicker bind:hue {sat} {val} on:change={syncPercents} />
		</div>
		<div class="hsv-manual-wrap">
			<div class="hsv-manual-input">
				<input type="number" bind:value={hue} name="hue" id="hue" min="0" max="360" />
				<label for="hue">Hue</label>
			</div>
			<div class="hsv-manual-input">
				<input
					type="number"
          bind:this={satInput}
					bind:value={percentSat}
					on:input={syncPercentsMan}
					name="sat"
					id="sat"
					min="0"
					max="100"
				/>
				<label for="sat">Saturation</label>
			</div>
			<div class="hsv-manual-input">
				<input
					type="number"
          bind:this={valInput}
					bind:value={percentVal}
					on:input={syncPercentsMan}
					name="val"
					id="val"
					min="0"
					max="100"
				/>
				<label for="val">Value</label>
			</div>
		</div>
	</div>
</main>
