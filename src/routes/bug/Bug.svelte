<script lang="ts">
	import { dateFormat } from '$lib/functions';
	import { t } from '$lib/localization';
	import Card from '$lib/text/Card.svelte';
	import type { bug } from '@prisma/client';
	import './Bug.scss';
	import BugTag from './BugTag.svelte';

	export let bug: bug;
</script>

<main class="bug">
	<Card>
		<span slot="timestamp">
			{dateFormat(new Date(bug.created_at))}
		</span>

		<span slot="title">
			{bug.name}
		</span>

		<span slot="body">
			{bug.description}
		</span>

		<span slot="footer">
			<br />
			{#if bug.tags.length > 0}
			<div class="tags-wrapper">
				<span>{$t('bug.tags')}</span>
				<div class="tags">
					{#each bug.tags as tag, i}
						<BugTag tagName={tag} />
					{/each}
				</div>
			</div>
			{:else}
				<span>{$t('bug.noTags')}</span>
			{/if}
		</span>
	</Card>
</main>
