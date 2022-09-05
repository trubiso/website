<script lang="ts">
	import './ColorPicker.scss';

	import { createEventDispatcher } from 'svelte';

	import AllPickers from './AllPickers.svelte';

	export let color = '#000000';
	export let label = '';
	export let id: string;
	let oldColor = color;

	let open = false;

	function toggle() {
		open = !open;
		if (open) {
			oldColor = color;
			changeHEX(color);
		}
	}

	let changeHEX: (hex: string) => {};

	const dispatch = createEventDispatcher();
	function change() {
		dispatch('change');
	}
</script>

<main>
	{color}
	<div class="color-picker">
		<div class="input">
			<input type="color" id="{id}" bind:value={color} on:click|preventDefault={toggle} />
			{#if label !== ''}
				<label for="{id}">{label}</label>
			{/if}
		</div>
		<div class="pickers-wrap" class:open>
			<AllPickers
				bind:changeHEX
				bind:oldColor
				bind:hex={color}
				on:change={change}
				on:done={toggle}
			/>
		</div>
	</div>
</main>
