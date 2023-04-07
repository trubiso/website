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

	{#if data.tag !== null}
		<h1>{$t('bug.selectedTag')}{$localizeTag(data.tag)}</h1>
	{/if}

	{#if unsolved.length}
		<div class="unsolved">
			<h2>{$t('bug.unsolved')} ({unsolved.length})</h2>
			<div class="bug-grid">
				{#each unsolved as bug}
					{#key unsolved}
						<Bug {bug} />
					{/key}
				{/each}
			</div>
		</div>
	{/if}

	{#if solved.length}
		<div class="solved">
			<h2>{$localizeTag('prioritySolved')} ({solved.length})</h2>
			<div class="bug-grid">
				{#each solved as bug}
					{#key solved}
						<Bug {bug} />
					{/key}
				{/each}
			</div>
		</div>
	{/if}
</main>
