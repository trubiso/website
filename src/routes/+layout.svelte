<script lang="ts">
	import { langs } from '$lib/json';
	import Navbar from '$lib/navbar/Navbar.svelte';
	import { lang } from '$lib/stores';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

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
	});
</script>

<Navbar />

<slot />
