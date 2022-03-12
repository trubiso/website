<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { qa } from '@prisma/client';
  import '../styles/q+a.scss';

  export const load: Load = async ({ fetch, url }) => {
    const page = url.searchParams.has('page') ? parseInt(url.searchParams.get('page')) : 1;
    const fetched = await fetch(`/api/q+a?page=${page}`, { method: 'GET' }).then((v) => v.json());
    const { questions, hasPreviousPage, hasNextPage } = fetched;
    return {
      props: {
        questions,
        hasPreviousPage,
        hasNextPage,
        page
      }
    };
  };
</script>

<script lang="ts">
  import Emote from '$lib/emote.svelte';
  import Question from '$lib/question.svelte';
  import { getTextCollection, getTitleOfPage } from '$lib/vars';
  import { lang } from '$lib/stores';

  export let questions: qa[] = [];
  export let hasPreviousPage = false;
  export let hasNextPage = false;
  export let page = 1;

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

  const texts = getTextCollection('q+a');
  const error = getTextCollection('error');
</script>

<svelte:head>
  <title>{getTitleOfPage('q+a', $lang)}</title>
</svelte:head>

<main class="q-a">
  <h1>{texts[$lang][0]}</h1>
  <form action="" on:submit|preventDefault={handleSubmit}>
    <div class="question-input" class:smaller-qi={hasSubmittedQuestion}>
      {#if !hasSubmittedQuestion}
        <label for="text">{texts[$lang][1]}</label>
        <textarea name="text" id="text" cols="30" rows="10" bind:value={question} required />
        <input type="submit" value={texts[$lang][2]} />
      {:else}
        {#await questionPromise}
          <label for="">{texts[$lang][3]}</label>
          <Emote name="silly" spinning />
        {:then result}
          {#if result.success}
            <label for="">{texts[$lang][4]}</label>
            <input type="submit" value={texts[$lang][5]} />
          {:else}
            <label for="">{error[$lang][0]} !! {result.error}</label>
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

  <div class="navigation">
    {#if hasPreviousPage}
      <a href="/q+a?page={page - 1}" class="previous">←</a>
    {:else}
      <span class="previous" />
    {/if}
    <div class="page">page {page}</div>
    {#if hasNextPage}
      <a href="/q+a?page={page + 1}" class="next">→</a>
    {:else}
      <span class="next" />
    {/if}
  </div>
</main>
