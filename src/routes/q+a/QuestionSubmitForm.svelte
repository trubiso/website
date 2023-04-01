<script lang="ts">
	import { t } from '$lib/localization';
	import Emote from '$lib/text/Emote.svelte';
	import './QuestionSubmitForm.scss';

	let hasSubmittedQuestion = false;
	let question = '';
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
</script>

<main class="question-submit-form">
	<form action="" method="post" on:submit|preventDefault={handleSubmit}>
		<div class="question-input" class:smaller-qi={hasSubmittedQuestion}>
			{#if !hasSubmittedQuestion}
				<label for="text">{t('q+a.submitAskMe')}</label>
				<textarea name="text" id="text" cols="30" rows="10" bind:value={question} required />
				<input type="submit" value={t('q+a.submitSendButton')} />
			{:else}
				{#await questionPromise}
					<label for="">{t('q+a.submitSendingQuestion')}</label>
					<Emote name="silly" spinning />
				{:then result}
					{#if result.success}
						<label for="">{t('q+a.submitSendSuccess')}</label>
						<input type="submit" value={t('q+a.submitSendMore')} />
					{:else}
						<label for="">{t('q+a.submitSendError')} !!</label>
						<Emote name="shock" scaling />
						{#if result.error === 'question missing'}
							<p>{t('q+a.submitSendErrorQuestionMissing')}</p>
						{:else}
							<p>{t('q+a.submitSendErrorOther')}</p>
							<pre>{JSON.stringify(result.error)}</pre>
						{/if}
						<input type="submit" value={t('q+a.submitTryAgain')} />
					{/if}
				{/await}
			{/if}
		</div>
	</form>
</main>
