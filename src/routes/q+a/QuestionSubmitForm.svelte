<script lang="ts">
	import { submitFormFormat } from '$lib/functions';
	import { t, v } from '$lib/localization';
	import Emote from '$lib/text/Emote.svelte';
	import Question from './Question.svelte';
	import './QuestionSubmitForm.scss';

	let hasSubmittedQuestion = false;
	$: question = '';
	async function submitQuestion() {
		return await fetch(`/api/q+a`, {
			method: 'POST',
			body: JSON.stringify({
				question
			})
		}).then((v) => v.json());
	}

	let questionPromise: Promise<any>;

	function handleSubmit() {
		if (hasSubmittedQuestion) {
			question = '';
		} else {
			questionPromise = submitQuestion();
		}
		hasSubmittedQuestion = !hasSubmittedQuestion;
	}

	$: sampleQuestion = {
		created_at: new Date(),
		question: question.trim() === '' ? $t('q+a.placeholderTitle') : question,
		answer: null
	};

	const fmt = submitFormFormat('q+a');
</script>

<main class="question-submit-form">
	<form action="" method="post" on:submit|preventDefault={handleSubmit}>
		<div class="question-input" class:smaller-qi={hasSubmittedQuestion}>
			{#if !hasSubmittedQuestion}
				<label for="text">{$t('q+a.askMe')}</label>
				<textarea name="text" id="text" cols="30" rows="10" bind:value={question} required />
				<label for="question">{$t('q+a.questionPreview')}</label>
				{#key sampleQuestion}
					<div id="question">
						<Question question={sampleQuestion} />
					</div>
				{/key}
				<input type="submit" value={$v('submitForm.send')(fmt)} />
			{:else}
				{#await questionPromise}
					<label for="">{$v('submitForm.sending')(fmt)}</label>
					<Emote name="silly" spinning />
				{:then result}
					{#if result.success}
						<label for="">{$v('submitForm.sendSuccess')(fmt)}</label>
						<input type="submit" value={$v('submitForm.sendMore')(fmt)} />
					{:else}
						<label for="">{$v('submitForm.sendError')(fmt)}</label>
						<Emote name="shock" scaling />
						{#if result.error === 'question missing'}
							<p>{$t('q+a.errorQuestionMissing')}</p>
						{:else}
							<p>{$t('q+a.errorOther')}</p>
							<pre>{JSON.stringify(result.error)}</pre>
						{/if}
						<input type="submit" value={$v('submitForm.tryAgain')(fmt)} />
					{/if}
				{/await}
			{/if}
		</div>
	</form>
</main>
