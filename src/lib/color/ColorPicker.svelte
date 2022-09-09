<script lang="ts">
	import './ColorPicker.scss';

	import { createEventDispatcher } from 'svelte';

	import AllPickers from './AllPickers.svelte';
	import { lock } from '$lib/stores';

	export let color = '#000000';
	export let label: string;
	export let id: string;
	let oldColor = color;

	let open = false;

	function toggle() {
		open = !open;
		lock.set(open);
		if (open) {
			oldColor = color;
			changeHEX(color);
		}
	}

	let changeHEX: (hex: string) => {};
	
	export function importHEX(hex: string) {
		changeHEX(hex);
	}

	const dispatch = createEventDispatcher();
	function change() {
		dispatch('change');
	}
</script>

<main>
	<div class="color-picker">
		<div class="input">
			<input type="color" {id} bind:value={color} on:click|preventDefault={toggle} />
			{#if label !== ''}
				<label for={id}>{label}</label>
			{/if}
		</div>
		{#if open}
			<div class="obstruct" />
		{/if}
		<div class="pickers-wrap" class:open>
			<AllPickers
				bind:changeHEX
				bind:oldColor
				bind:hex={color}
				on:change={change}
				on:done={toggle}
				{label}
			/>
		</div>
	</div>
</main>
