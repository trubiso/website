<script lang="ts">
	import { themes } from '$lib/json';
	import { t } from '$lib/localization';
	import { theme } from '$lib/stores';
	import type { ITheme } from '$lib/types';

	export let name = 'smilie';

	$: themeObj = (themes as Record<string, ITheme>)[name];
	$: title = t(`themes.${name}`);

	function changeTheme() {
		theme.set(themeObj);
	}
</script>

<main>
	<a href="#h" class="opt-picker-item-wrap" on:click|preventDefault={changeTheme}>
		<div
			class="opt-picker-item"
			style="--bg1:{themeObj.navbarBG1};--bg2:{themeObj.navbarBG2};--c:{themeObj.accent}"
		>
			{title}
		</div>
	</a>
</main>
