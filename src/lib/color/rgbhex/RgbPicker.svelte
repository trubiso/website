<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import '../ManualPicker.scss';

	export let r = 0,
		g = 0,
		b = 0;

	function check() {
		r = Math.min(Math.max(r, 0), 255);
		g = Math.min(Math.max(g, 0), 255);
		b = Math.min(Math.max(b, 0), 255);
		change();
	}

	const dispatch = createEventDispatcher();
	function change() {
		dispatch('change');
	}
</script>

<main>
	<div class="manual">
		<div class="manual-input">
			<input type="number" bind:value={r} on:input={check} name="r" id="r" min="0" max="255" />
			<label for="r">red</label>
		</div>
		<div class="manual-input">
			<input type="number" bind:value={g} on:input={check} name="g" id="g" min="0" max="255" />
			<label for="g">green</label>
		</div>
		<div class="manual-input">
			<input type="number" bind:value={b} on:input={check} name="b" id="b" min="0" max="255" />
			<label for="b">blue</label>
		</div>
	</div>
</main>
