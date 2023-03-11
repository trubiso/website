<script lang="ts">
	import type { qa } from '@prisma/client';
	import PageSwitcher from './PageSwitcher.svelte';
	import Question from './Question.svelte';
	import './style.scss';

	export let data: {
		questions: qa[];
		hasPreviousPage: boolean;
		hasNextPage: boolean;
		currentPage: number;
		maximumPage: number;
	};
</script>

<main class="qa">
	<h1>questions and answers</h1>

	<PageSwitcher {...data} />

	<div class="questions-wrapper">
		{#each data.questions as question}
			<Question {question} />
		{/each}
	</div>

	<PageSwitcher {...data} />
</main>
