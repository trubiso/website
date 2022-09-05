<script lang="ts">
	import './Picker.scss';
	import { order, themes } from '$lib/json';
	import ThemePickerItem from './ThemePickerItem.svelte';
</script>

<main class="opt-theme">
	<div class="opt-picker">
		{#each order.themes as theme}
			<ThemePickerItem name={theme} />
		{/each}
	</div>
</main>
