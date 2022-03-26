<script lang="ts">
  import Emote from '$lib/emote.svelte';
  import { lang } from '$lib/stores';
  import { socialMedias, getTitleOfPage, getTextCollection } from '$lib/vars';

  const texts = getTextCollection('about');
</script>

<svelte:head>
  <title>{getTitleOfPage('about', $lang)}</title>
</svelte:head>

<main>
  <h1>{getTitleOfPage('about', $lang)}</h1>
  <h2>{texts[$lang][0]}</h2>
  <p>
    {texts[$lang][1]}
    <Emote name="skype_bandit" />
  </p>
  <p>
    {texts[$lang][2]}
    <a href="https://github.com/trubiso/website" target="_blank">
      https://github.com/trubiso/website
    </a>
    <Emote name="tongue_right" />
  </p>
  <p>
    {texts[$lang][3]}
    <Emote name="flush_happy" />
  </p>
  <p>
    {texts[$lang][4]}
  </p>
  <ul>
    {#each Array.from(socialMedias.entries()) as [name, data]}
      <li>
        {name}: {#if data.link}
          <a href={data.link} target="_blank">{data.name}</a>
        {:else}
          <span>{data.name}</span>
        {/if}
      </li>
    {/each}
  </ul>
  <p>
    {texts[$lang][5]}
    <Emote name="pet" />
  </p>
</main>
