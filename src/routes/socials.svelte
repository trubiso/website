<script lang="ts">
  import Emote from '$lib/emote.svelte';
  import Meta from '$lib/meta.svelte';
  import { lang } from '$lib/stores';
  import { socialMedias, getTitleOfPage, getTextCollection } from '$lib/vars';

  const texts = getTextCollection('about');
  let twitterSatana = 0;
</script>

<Meta title={getTitleOfPage('about', $lang)} description="come to know more about my page!" />

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
    <li>
      <span on:click={() => twitterSatana++} class:twitter={twitterSatana} class="element">
        {#if twitterSatana}
            {#if twitterSatana < 10}
              <Emote name="satana2" />
            {:else if twitterSatana < 25}
              <Emote name="satana3" />
            {:else if twitterSatana < 50}
              <Emote name="satana1" /> yur tikcling me !!
            {:else if twitterSatana < 100}
              <Emote name="angry_pink" /> STOPPE IT !!
            {:else if twitterSatana < 150}
              <Emote name="please" /> pleez... stop tinkqling mee !!
            {:else if twitterSatana < 200}
              <Emote name="sad2" /> i gues il just ignor yuor clinqse !!
            {:else if twitterSatana < 220}
              <Emote name="neutral" />
            {:else if twitterSatana < 300}
              <Emote name="pain" />
            {:else if twitterSatana < 400}
              <Emote name="allifeelispain" />
            {:else}
              <span class="dead">xP (gud job !! yu kild twiter !! <Emote name="happy" />)</span>
            {/if}
        {:else}
          twitter
        {/if}
      </span>
    </li>
  </ul>
  <p>
    {texts[$lang][5]}
    <Emote name="pet" />
  </p>
</main>

<style lang="scss">
  .element {
    cursor: pointer;
    text-decoration: underline;
  }
  .twitter {
    text-decoration: none;
    user-select: none;
  }
  .dead {
    cursor: text;
    user-select: text;
  }
</style>
