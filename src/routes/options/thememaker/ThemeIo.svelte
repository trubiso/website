<script lang="ts">
	import { t } from '$lib/localization';
	import { theme } from '$lib/stores';

	import { codeToTheme, themeToCode } from '$lib/themes';

	function exportTheme() {
		const code = themeToCode($theme);
		navigator.clipboard.writeText(code);
		alert(`${t('options.exportThemeMsg')} (${code})`);
	}

	function importTheme() {
		const code = prompt(t('options.importThemeMsg'));
		if (!code) return;
		try {
			const th = codeToTheme(code);
			theme.set(th);
			alert(t('options.importThemeSuccess'));
		} catch (e) {
			alert(t('options.importThemeFail'));
		}
	}
</script>

<main>
	<button on:click={exportTheme}>{t('options.exportTheme')}</button>
	<button on:click={importTheme}>{t('options.importTheme')}</button>
</main>
