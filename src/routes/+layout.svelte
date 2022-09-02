<script lang="ts">
	import { langs } from '$lib/json';
	import Navbar from '$lib/navbar/Navbar.svelte';
	import { lang, mobile, sidebarLocation, theme } from '$lib/stores';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { themeToCSS } from '$lib/themes';
	import './global.scss';

	onMount(() => {
		if (get(lang) === 'none') {
			const lp = navigator.languages;
			for (const l of lp) {
				if (Object.keys(langs).includes(l)) {
					lang.set(l);
					break;
				}
			}
		}

		const q = window.matchMedia('(max-width: 600px)');
		q.addEventListener('change', (v) => mobile.set(v.matches));
		mobile.set(q.matches);
	});
</script>

<svelte:head>
	<meta content={$theme.navbarBG1} data-react-helmet="true" name="theme-color" />
</svelte:head>

<main class="content" style={themeToCSS($theme)}>
	<div
		class="content-wrapper"
		class:sidebar-top={!$sidebarLocation && $mobile}
		class:sidebar-left={!$sidebarLocation && !$mobile}
		class:sidebar-right={$sidebarLocation && !$mobile}
		class:sidebar-bottom={$sidebarLocation && $mobile}
		class:mobile={$mobile}
	>
		<Navbar />

		<slot />
	</div>
</main>
