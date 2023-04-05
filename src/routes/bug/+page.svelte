<script lang="ts">
	import { t } from '$lib/localization';
	import type { bug } from '@prisma/client';
	import Bug from './Bug.svelte';
	import BugSubmitForm from './BugSubmitForm.svelte';

	export let data: {
		bugs: bug[];
		tag: string | null;
	};
</script>

<main class="bugs">
	<h1>{$t('bug.title')}</h1>

	<BugSubmitForm />

	{#each data.bugs as bug}
		<Bug {bug} />
	{/each}
</main>
