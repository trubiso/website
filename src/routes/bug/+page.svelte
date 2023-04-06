<script lang="ts">
	import { t } from '$lib/localization';
	import type { bug } from '@prisma/client';
	import Bug from './Bug.svelte';
	import BugSubmitForm from './BugSubmitForm.svelte';
	import './style.scss';

	export let data: {
		bugs: bug[];
		tag: string | null;
	};
</script>

<main class="bugs">
	<h1>{$t('bug.title')}</h1>

	<BugSubmitForm />

	<div class="bug-grid">
		{#each data.bugs as bug}
			{#key data.bugs}
				<Bug {bug} />
			{/key}
		{/each}
	</div>
</main>
