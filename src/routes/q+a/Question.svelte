<script lang="ts">
	import { dateFormat } from '$lib/functions';
	import { t } from '$lib/localization';
	import Card from '$lib/text/Card.svelte';
	import type { qa } from '@prisma/client';
	import './Question.scss';

	export let question: qa;
</script>

<main class="question">
	<Card>
		<span slot="timestamp">
			{dateFormat(new Date(question.created_at))}
		</span>

		<span slot="title">
			{question.question}
		</span>
		
		<span slot="body">
			{#if question.answer !== null}
				{question.answer}
			{:else}
				{$t('q+a.placeholderAnswer')}
			{/if}
		</span>
	</Card>
</main>
