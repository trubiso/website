<script lang="ts">
	import { dateFormat } from '$lib/functions';
	import { t } from '$lib/localization';
	import Card from '$lib/text/Card.svelte';
	import EmoteZone from '$lib/text/EmoteZone.svelte';
	import Markup from '$lib/text/Markup.svelte';
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
			<Markup><EmoteZone>{question.question}</EmoteZone></Markup>
		</span>
		<span slot="answer">
			{#if question.answer !== null}
				<Markup><EmoteZone>{question.answer}</EmoteZone></Markup>
			{:else}
				<Markup><EmoteZone>{$t('q+a.placeholderAnswer')}</EmoteZone></Markup>
			{/if}
		</span>
	</Card>
</main>
