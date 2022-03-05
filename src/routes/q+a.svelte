<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { qa } from '@prisma/client';
  import '../styles/q+a.scss';

  export const load: Load = async ({ fetch }) => {
    const questions = await fetch(`/api/q+a`, { method: 'GET' })
      .then((v) => v.json())
      .then((v) => v.questions);
    return {
      props: {
        questions
      }
    };
  };
</script>

<script lang="ts">
  import Emote from '$lib/emote.svelte';
  import Question from '$lib/question.svelte';
  import { getTitleOfPage } from '$lib/vars';
  import { lang } from '$lib/stores';

  export let questions: qa[] = [];

  let hasSubmittedQuestion = false;
  let questionPromise: Promise<any>;

  let question = '';
  async function submitQuestion() {
    return await fetch(`/api/q+a`, {
      method: 'POST',
      body: JSON.stringify({
        question
      })
    }).then((v) => v.json());
  }

  function handleSubmit() {
    if (hasSubmittedQuestion) {
      hasSubmittedQuestion = false;
      question = '';
    } else {
      hasSubmittedQuestion = true;
      questionPromise = submitQuestion();
    }
  }
</script>

<svelte:head>
  <title>{getTitleOfPage('q+a', $lang)}</title>
</svelte:head>

<main class="q-a">
  <h1>questionese + ANSWERESE</h1>
  <form action="" on:submit|preventDefault={handleSubmit}>
    <div class="question-input" class:smaller-qi={hasSubmittedQuestion}>
      {#if !hasSubmittedQuestion}
        <label for="text">ask mee!</label>
        <textarea name="text" id="text" cols="30" rows="10" bind:value={question} required />
        <input type="submit" value="submite" />
      {:else}
        {#await questionPromise}
          <label for="">SUBMITING QUESTIONE !</label>
          <Emote name="silly" spinning />
        {:then result}
          {#if result.success}
            <label for="">submited YUOR questione suncesnfuly !</label>
            <input type="submit" value="ask moar?" />
          {:else}
            <label for="">ERROAR !! {result.error}</label>
            {console.log(result)}
          {/if}
        {/await}
      {/if}
    </div>
  </form>

  <div class="question-wrapper">
    {#each questions as question}
      <Question {question} />
    {/each}
  </div>
</main>
