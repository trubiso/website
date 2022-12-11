<script lang="ts">
	import './Question.scss';
	import { dateFormat } from '$lib/functions';
	import type { qa } from '@prisma/client';
	import EmoteZone from '$lib/text/EmoteZone.svelte';
	import Markup from '$lib/text/Markup.svelte';

	export let question: qa;
</script>

<main class="question">
	<div class="question-timestamp">
		{dateFormat(new Date(question.created_at))}
	</div>
	<div class="question-title">
		<Markup><EmoteZone>{question.question}</EmoteZone></Markup>
	</div>
	<div class="question-answer">
    <Markup><EmoteZone>{question.answer}</EmoteZone></Markup>
	</div>
</main>
