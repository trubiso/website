<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import '../ManualPicker.scss';
	export let hex = '#000000';
  let intHex = '#000000';

	function check() {
		intHex = intHex.toLowerCase();
		intHex = intHex.replace(/[^0-9a-f]/g, '');
		if (!intHex.startsWith('#')) intHex = `#${intHex}`;
	}

	function checkChange() {
		if (intHex.length > 7) intHex = intHex.slice(0, 7);
		if (intHex.length === 4) intHex = `#${intHex[1].repeat(2)}${intHex[2].repeat(2)}${intHex[3].repeat(2)}`;
		while (intHex.length < 7) intHex += '0';
    hex = intHex;
    change();
	}

  export function changeIntHex(newHex: string) {
    intHex = newHex;
  }

	const dispatch = createEventDispatcher();
	function change() {
		dispatch('change');
	}
</script>

<main>
	<div class="manual big">
		<div class="manual-input">
			<input
				type="text"
				bind:value={intHex}
				on:input={check}
				on:change={checkChange}
				name="hex"
				id="hex"
			/>
			<label for="hex">hex</label>
		</div>
	</div>
</main>
