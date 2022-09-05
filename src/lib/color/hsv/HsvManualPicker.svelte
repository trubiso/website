<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import '../ManualPicker.scss';

	export let hue = 47,
		sat = 1,
		val = 1;

	let sSat = 1;
	let sVal = 1;

	function check() {
		hue = Math.min(Math.max(hue, 0), 360);
		sSat = Math.min(Math.max(sSat, 0), 100);
		sVal = Math.min(Math.max(sVal, 0), 100);

		sat = sSat;
		val = sVal;

		change();
	}

	onMount(syncShown);

	export function syncShown() {
		sSat = Math.round(sat);
		sVal = Math.round(val);
	}

	const dispatch = createEventDispatcher();
	function change() {
		dispatch('change');
	}
</script>

<main>
	<div class="manual">
		<div class="manual-input">
			<input
				type="number"
				bind:value={hue}
				on:input={check}
				name="hue"
				id="hue"
				min="0"
				max="360"
			/>
			<label for="hue">hue</label>
		</div>
		<div class="manual-input">
			<input
				type="number"
				bind:value={sSat}
				on:input={check}
				name="sat"
				id="sat"
				min="0"
				max="100"
			/>
			<label for="sat">saturation</label>
		</div>
		<div class="manual-input">
			<input
				type="number"
				bind:value={sVal}
				on:input={check}
				name="val"
				id="val"
				min="0"
				max="100"
			/>
			<label for="val">value</label>
		</div>
	</div>
</main>
