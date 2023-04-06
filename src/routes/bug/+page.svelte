<script lang="ts">
	import { localizeTag } from '$lib/bug';
	import { t } from '$lib/localization';
	import type { bug } from '@prisma/client';
	import Bug from './Bug.svelte';
	import BugSubmitForm from './BugSubmitForm.svelte';
	import './style.scss';

	export let data: {
		bugs: bug[];
		tag: string | null;
	};

	$: unsolved = data.bugs.filter((x) => !x.tags.includes('prioritySolved'));
	$: solved = data.bugs.filter((x) => x.tags.includes('prioritySolved'));
</script>

<main class="bugs">
	<h1>{$t('bug.title')}</h1>

	<BugSubmitForm />

	<div class="unsolved">
		<div class="bug-grid">
			{#each unsolved as bug}
				{#key unsolved}
					<Bug {bug} />
				{/key}
			{/each}
		</div>
	</div>

	<div class="solved">
		<h1>{$localizeTag('prioritySolved')}</h1>
		<div class="bug-grid">
			{#each solved as bug}
				{#key solved}
					<Bug {bug} />
				{/key}
			{/each}
		</div>
	</div>
</main>
