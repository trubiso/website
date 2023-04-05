<script lang="ts">
	import { t } from '$lib/localization';
	import MiscOptions from './MiscOptions.svelte';
	import LangPicker from './pickers/LangPicker.svelte';
	import ThemePicker from './pickers/ThemePicker.svelte';
	import ThemeMaker from './thememaker/ThemeMaker.svelte';
</script>

<main>
	<h1>{$t('options.options')}</h1>
	<p>{$t('options.subtitle')}</p>

	<h2>{$t('options.language')}</h2>
	<LangPicker />
	<p>
		<i>{$t('options.translation')}</i>
	</p>

	<h2>{$t('options.theme')}</h2>
	<h3>{$t('options.premadeTheme')}</h3>
	<ThemePicker />
	<h3>{$t('options.customizeTheme')}</h3>
	<ThemeMaker />

	<h2>{$t('options.misc')}</h2>
	<MiscOptions />
</main>
