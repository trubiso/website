<script lang="ts">
	import './style.scss';
	import type { qa } from '@prisma/client';
	import Question from './Question.svelte';

	export let data: {
		questions: qa[];
		hasPreviousPage: boolean;
		hasNextPage: boolean;
	};
</script>

<main class="qa">
	<h1>questions and answers</h1>

	<div class="questions-wrapper">
		{#each data.questions as question}
			<Question {question} />
		{/each}
	</div>
</main>
