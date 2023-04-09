<script lang="ts">
	import { getCookies } from '$lib/functions';
	import { t } from '$lib/localization';
	import { onMount } from 'svelte';

	export let isLoggedIn = false;
	$: message = isLoggedIn ? $t('navbar.logged_in') : $t('navbar.log_in');

	export function update() {
		const cookies = getCookies();
		const username = cookies['username'];
		isLoggedIn = username !== undefined;
	}

	onMount(() => {
		update();
	});
</script>

{message}
