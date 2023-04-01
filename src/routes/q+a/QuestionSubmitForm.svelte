<script lang="ts">
	import Emote from '$lib/text/Emote.svelte';

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
				<label for="text">text[1]</label>
				<textarea name="text" id="text" cols="30" rows="10" bind:value={question} required />
				<input type="submit" value="text[2]" />
			{:else}
				{#await questionPromise}
					<label for="">text[3]</label>
					<Emote name="silly" spinning />
				{:then result}
					{#if result.success}
						<label for="">text[4]</label>
						<input type="submit" value="text[5]" />
					{:else}
						<label for="">error[0] !! {result.error}</label>
						{console.log(result)}
					{/if}
				{/await}
			{/if}
		</div>
	</form>
</main>
