<script lang="ts">
	import { localizeTag } from '$lib/bug';
	import { dateFormat } from '$lib/functions';
	import { t } from '$lib/localization';
	import Card from '$lib/text/Card.svelte';
	import type { bug } from '@prisma/client';

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
			{#if bug.tags.length > 1}
				<i>
					{$t('bug.tags')}{#each bug.tags as tag, i}
						<a href="?tag={tag}">[{$localizeTag(tag)}]</a>{#if i < bug.tags.length - 1},&nbsp;{/if}
					{/each}
				</i>
			{:else}
				<i>{$t('bug.noTags')}</i>
			{/if}
		</span>
	</Card>
</main>
