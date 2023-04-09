<script lang="ts">
	import { getCookies } from '$lib/functions';
	import { t } from '$lib/localization';
	import { onMount } from 'svelte';

	let message = $t('navbar.log_in');

	function update() {
		const cookies = getCookies();
		const username = cookies['username'];
		if (username !== undefined) $t('navbar.logged_in');
		else message = $t('navbar.log_in');
	}

	onMount(() => {
		update();
	});
</script>

{message}
