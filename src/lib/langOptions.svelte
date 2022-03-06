<script lang="ts">
  import { lang } from '$lib/stores';

  import { getTextCollection } from '$lib/vars';

  const langs = getTextCollection('langs');
  const texts = getTextCollection('options.langs');
</script>

<main>
  <h1>{texts[$lang][0]}</h1>
  <div class="picker">
    {#each langs as language, i}
      <div class="lang" class:bold={$lang === i} class:alt={i % 2} on:click={() => lang.set(i)}>
        {language}
      </div>
    {/each}
  </div>
</main>
