<script context="module">
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  export function load(error) {
    return {
      props: {
        title: `${error.status}`,
        error: error
      }
    };
  }
</script>

<script lang="ts">
  import Emote from '$lib/emote.svelte';
  import { getTextCollection } from '$lib/vars';
  import { lang } from '$lib/stores';

  export let title;
  export let error;

  const errorText = getTextCollection('error');
</script>

<svelte:head>
  <title>{errorText[$lang][0]} !!!</title>
</svelte:head>

<main>
  <h1>{errorText[$lang][0]} {title} !!! <Emote name="shock" size="44" /></h1>
  {#if title === '404'}
    {errorText[$lang][1]}
    <Emote name="allifeelispain" /><br />
    {errorText[$lang][2]}
    <Emote name="happy" /><br />
    {errorText[$lang][3]}
    <Emote name="shock_handless" /><br />
    {errorText[$lang][4]}
    <Emote name="glad" /><br /><br />
    {errorText[$lang][5]}
    <Emote name="sad" /><Emote name="sad2" /><Emote name="sad" /><br />
    {errorText[$lang][6]}
    <Emote name="excited" /><Emote name="excited_jumping" />
  {:else}
    {errorText[$lang][7]}
    <Emote name="think" /><Emote name="silly" /><br />
    {console.log(error)}
  {/if}
</main>
