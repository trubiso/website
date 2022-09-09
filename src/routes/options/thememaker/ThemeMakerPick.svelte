<script lang="ts">
	import ColorPicker from '$lib/color/ColorPicker.svelte';
	import { t } from '$lib/localization';
	import { theme } from '$lib/stores';
	import type { ThemeProp } from '$lib/types';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	export let prop: ThemeProp = 'navbarBG1';
	$: v = $theme[prop];

	function changeV() {
		const t = get(theme);
		t[prop] = v;
		theme.set(t);
	}

	let importHEX: (hex: string) => {};

	onMount(() => {
		importHEX(v);
	});
</script>

<main>
	<ColorPicker
		id={prop}
		label={t(`themeProps.${prop}`)}
		bind:importHEX
		bind:color={v}
		on:change={changeV}
	/>
</main>
