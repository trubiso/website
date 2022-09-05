<script lang="ts">
	import { mobile, sidebarLocation, sidebarStyle } from '$lib/stores';
	import ThemePicker from './pickers/ThemePicker.svelte';
</script>

<main>
	<label for="sidebarLocation">sidebar location</label>
	<select name="sidebarLocation" id="sidebarLocation" bind:value={$sidebarLocation}>
		<option value={0}>{$mobile ? '↑' : '←'}</option>
		<option value={1}>{$mobile ? '↓' : '→'}</option>
	</select>
	<br />
	<label for="sidebarStyle">sidebar style</label>
	<select name="sidebarStyle" id="sidebarStyle" bind:value={$sidebarStyle}>
		<option value={0}>regular gradient</option>
		<option value={1}>alpha gradient</option>
		<option value={2}>rainbow</option>
		<option value={3}>strong rainbow</option>
	</select>

	<ThemePicker />
</main>
