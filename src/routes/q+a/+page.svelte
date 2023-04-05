<script lang="ts">
	import { t } from '$lib/localization';
	import Emote from '$lib/text/Emote.svelte';
	import type { qa } from '@prisma/client';
	import PageSwitcher from './PageSwitcher.svelte';
	import Question from './Question.svelte';
	import QuestionSubmitForm from './QuestionSubmitForm.svelte';
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
	<h1>{$t('q+a.title')}</h1>

	<QuestionSubmitForm />

	<PageSwitcher {...data} />

	{#if data.currentPage < 1 || data.currentPage > data.maximumPage}
		<div class="invalid">
			<p>{$t('navigation.invalidPage')}</p>
			<Emote name="silly" />
			<p />
		</div>
	{:else}
		<div class="questions-wrapper">
			{#each data.questions as question}
				<Question {question} />
			{/each}
		</div>
	{/if}

	<PageSwitcher {...data} />
</main>
