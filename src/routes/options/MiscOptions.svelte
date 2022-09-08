<script lang="ts">
  import './MiscOptions.scss';
	import { mobile, sidebarLocation, sidebarStyle } from '$lib/stores';

	function clearLocalStorage() {
		if (
			confirm(
				'do you really want to clear your local storage for this website? (WARNING: this will erase all of your settings including any custom theme you may have made. your login session will persist though)'
			)
		) {
			localStorage.clear();
			alert('local storage has been cleared successfully :)');
			location.reload();
		} else {
			alert('oke, local storage has been left unchanged :)');
		}
	}
</script>

<main class="misc-options">
	<div>
		<label for="sidebarLocation">sidebar location</label>
		<select name="sidebarLocation" id="sidebarLocation" bind:value={$sidebarLocation}>
			<option value={0}>{$mobile ? '↑' : '←'}</option>
			<option value={1}>{$mobile ? '↓' : '→'}</option>
		</select>
	</div>

	<div>
		<label for="sidebarStyle">sidebar style</label>
		<select name="sidebarStyle" id="sidebarStyle" bind:value={$sidebarStyle}>
			<option value={0}>regular gradient</option>
			<option value={1}>alpha gradient</option>
			<option value={2}>rainbow</option>
			<option value={3}>strong rainbow</option>
		</select>
	</div>

	<div>
		<button id="clearLocal" on:click={clearLocalStorage}>clear local storage</button>
		<label for="clearLocal">(will fix strange behaviour)</label>
	</div>
</main>
