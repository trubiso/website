<script lang="ts">
  import Emote from '$lib/emote.svelte';
  import { getTextCollection, getTitleOfPage } from '$lib/vars';
  import { lang } from '$lib/stores';

  const reasons = getTextCollection('index.reasons');
  const texts = getTextCollection('index.texts');
</script>

<svelte:head>
  <title>{getTitleOfPage('home', $lang)}</title>
</svelte:head>

<main>
  <h1>{texts[$lang][0]} <Emote name="happy" size="44" /></h1>
  <span> {texts[$lang][1]} <Emote name="nerd_emotiguy" /> </span>
  <ol>
    {#each reasons[$lang] as reason}
      <li>{reason}</li>
    {/each}
  </ol>
  <p />
  <img src="/likangel.png" alt="" width="256" />
</main>

<style>
  h1 {
    width: 100%;
  }
</style>
