<script lang="ts">
	import './MiscOptions.scss';
	import { mobile, sidebarLocation, sidebarStyle } from '$lib/stores';
	import { t } from '$lib/localization';

	function clearLocalStorage() {
		if (confirm(t('options.clearPreferencesPrompt'))) {
			localStorage.clear();
			alert(t('options.clearPreferencesDone'));
			location.reload();
		} else {
			alert(t('options.clearPreferencesNotDone'));
		}
	}
</script>

<main class="misc-options">
	<div>
		<label for="sidebarLocation">{t('options.sidebarLocation')}</label>
		<select name="sidebarLocation" id="sidebarLocation" bind:value={$sidebarLocation}>
			<option value={0}>{$mobile ? '↑' : '←'}</option>
			<option value={1}>{$mobile ? '↓' : '→'}</option>
		</select>
	</div>

	<div>
		<label for="sidebarStyle">{t('options.sidebarStyle')}</label>
		<select name="sidebarStyle" id="sidebarStyle" bind:value={$sidebarStyle}>
			<option value={0}>{t('options.sidebarStyleRegular')}</option>
			<option value={1}>{t('options.sidebarStyleAlpha')}</option>
			<option value={2}>{t('options.sidebarStyleRainbow')}</option>
			<option value={3}>{t('options.sidebarStyleStrongRainbow')}</option>
		</select>
	</div>

	<div>
		<button id="clearLocal" on:click={clearLocalStorage}>{t('options.clearPreferences')}</button>
		<label for="clearLocal">{t('options.clearPreferencesExplainer')}</label>
	</div>
</main>
