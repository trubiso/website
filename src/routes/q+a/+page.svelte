<script lang="ts">
	import { getEmote } from '$lib/functions';
	import { t } from '$lib/localization';
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
	<h1>{t("q+a.title")}</h1>

	<PageSwitcher {...data} />

	{#if data.currentPage > data.maximumPage}
		<div class="invalid">
			<p>{t('q+a.invalidPage')}</p>
			<img src={getEmote('silly')} alt=":silly:" />
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
