<script lang="ts">
	import { order } from '$lib/json';
	import './Picker.scss';
	import ThemePickerItem from './ThemePickerItem.svelte';
</script>

<main class="opt opt-theme">
	<div class="opt-picker">
		{#each order.themes as theme}
			<ThemePickerItem name={theme} />
		{/each}
	</div>
</main>
