<script lang="ts">
	import { mobile, sidebarLocation, sidebarStyle } from '$lib/stores';
	import LangPicker from './pickers/LangPicker.svelte';
	import ThemePicker from './pickers/ThemePicker.svelte';

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

<main>
	<h1>optionse !</h1>
	<p>heer yu can customiz how da paeg luks 4 yu !</p>

	<h2>languig</h2>
	<LangPicker />
	<p><i>if da languig yu speek is not heer, yu can hed to da transletion paeg n translet da paeg to yur languig !</i></p>

	<h2>theem</h2>
	<h3>pik wan of da premaed theemz...</h3>
	<ThemePicker />
	<h3>or mek wan urslef !</h3>
	<p>(yu cnant yet)</p>

	<h2>miscelanius</h2>
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

	<br />
	<button id="clearLocal" on:click={clearLocalStorage}>clear local storage</button>
	<label for="clearLocal">(will fix strange behaviour)</label>

</main>
