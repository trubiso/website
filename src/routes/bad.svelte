<script lang="ts">
  import Emote from '$lib/emote.svelte';

  import { lang } from '$lib/stores';

  import { getTextCollection, getTitleOfPage } from '$lib/vars';

  const texts = getTextCollection('bad');

  let phase = 0,
    text = '',
    smilieCount = 0;
  const requiredText = 'dQw4w9WgXcQ';

  function textPhase() {
    if (text === requiredText) {
      phase++;
      function incrementSmilies() {
        smilieCount++;
        setTimeout(incrementSmilies, 1000);
      }
      incrementSmilies();
    }
  }
</script>

<svelte:head>
  <title>{getTitleOfPage("don't click", $lang)}</title>
</svelte:head>

<main>
  {#if phase === 0}
    {texts[$lang][0]}
    <span class="whitespace" />
    {texts[$lang][1]}
    <span class="whitespace" />
    {texts[$lang][2]}
    <span class="whitespace" />
    <span class="whitespace" />
    {texts[$lang][3]}
    <span class="whitespace" />
    <span class="whitespace" />
    <span class="whitespace" />
    {texts[$lang][4]}
    <span class="whitespace" />
    <span class="whitespace" />
    <span class="whitespace" />
    <span class="whitespace" />
    <span on:click={() => phase++} style="cursor: pointer;">{texts[$lang][5]}</span>
  {:else if phase === 1}
    <h1>{texts[$lang][6]}</h1>
    <br />{texts[$lang][7]} <br /><span class="hidden">{texts[$lang][8]}</span><br />
    <input type="text" bind:value={text} on:change={textPhase} />
  {:else if phase === 2}
    <div class="infinite-smilies">
      {#each [...Array(smilieCount)] as _}
        <Emote name="happy" size="128" /><br />
      {/each}
    </div>
  {/if}
</main>

<style lang="scss">
  .hidden {
    color: var(--bg);
    cursor: default;
  }

  .whitespace {
    display: block;
    height: 70px;
  }

  @media (max-width: 600px) {
    main {
      text-align: center;
    }
  }
</style>
