<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/localization';
	import EmoteZone from '$lib/text/EmoteZone.svelte';
</script>

<main>
	<h1>{$t('error.ohNo')}</h1>
	<p><EmoteZone>{$t('error.scream')}</EmoteZone></p>
	<hr />
	<p><b>Code:</b> {$page.status}</p>
	<pre>{$page.error?.message}</pre>
	<hr />
	<p><EmoteZone>{$t('error.report')}</EmoteZone></p>
</main>
