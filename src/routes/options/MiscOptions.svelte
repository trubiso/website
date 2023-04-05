<script lang="ts">
	import { t } from '$lib/localization';
	import { mobile, sidebarLocation, sidebarPopout, sidebarStyle } from '$lib/stores';
	import './MiscOptions.scss';

	function clearLocalStorage() {
		if (confirm($t('options.clearPreferencesPrompt'))) {
			localStorage.clear();
			alert($t('options.clearPreferencesDone'));
			location.reload();
		} else {
			alert($t('options.clearPreferencesNotDone'));
		}
	}
</script>

<main class="misc-options">
	<div>
		<label for="sidebarLocation">{$t('options.sidebarLocation')}</label>
		<select name="sidebarLocation" id="sidebarLocation" bind:value={$sidebarLocation}>
			<option value={0}>{$mobile ? '↑' : '←'}</option>
			<option value={1}>{$mobile ? '↓' : '→'}</option>
		</select>
	</div>

	<div>
		<label for="sidebarStyle">{$t('options.sidebarStyle')}</label>
		<select name="sidebarStyle" id="sidebarStyle" bind:value={$sidebarStyle}>
			<option value={0}>{$t('options.sidebarStyleRegular')}</option>
			<option value={1}>{$t('options.sidebarStyleAlpha')}</option>
			<option value={2}>{$t('options.sidebarStyleRainbow')}</option>
			<option value={3}>{$t('options.sidebarStyleStrongRainbow')}</option>
		</select>
	</div>

	<div>
		<label for="sidebarPopout">{$t('options.sidebarPopout')}</label>
		<select name="sidebarPopout" id="sidebarPopout" bind:value={$sidebarPopout}>
			<option value={0}>{$t('options.sidebarPopoutNo')}</option>
			<option value={1}>{$t('options.sidebarPopoutYes')}</option>
		</select>
	</div>

	<div>
		<button id="clearLocal" on:click={clearLocalStorage}>{$t('options.clearPreferences')}</button>
		<label for="clearLocal">{$t('options.clearPreferencesExplainer')}</label>
	</div>
</main>
