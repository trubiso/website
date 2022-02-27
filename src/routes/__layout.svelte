<script lang="ts">
	import Navbar from '$lib/navbar/navbar.svelte';
	import { getTextCollection, lang } from '$lib/vars';
	import { onMount } from 'svelte';
	import '../styles/globals.scss';

	// const themeNames = getTextCollection('themes')[0];

	// let ct = 0; // ct stands for current theme
	onMount(() => {
		if(localStorage.getItem('theme')) {
			document.documentElement.classList.add(localStorage.getItem('theme'));
		} else {
			localStorage.setItem('theme', 'smilie'); // bg hasnt isnt
			document.documentElement.classList.add('smilie');
		}
		lang.set(parseInt(window.localStorage.getItem('lang') ?? '0'));
		lang.subscribe((v) => {
			window.localStorage.setItem('lang', v.toString());
		});
		// theme.set(parseInt(window.localStorage.getItem('theme') ?? '0'));
		// theme.subscribe((v) => {
		// 	window.localStorage.setItem('theme', v.toString());
		// 	ct = v; // set the theme to the new theme
		// });
	});
</script>

<Navbar/>
<main class="content">
	<slot />
</main>
