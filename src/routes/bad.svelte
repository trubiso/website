<script lang="ts">
  import Emote from '$lib/emote.svelte';

  import { lang } from '$lib/stores';

  import { getTitleOfPage } from '$lib/vars';

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
    THIS IS A VERY BAD PAGE. LEAVE IT IMMEDIATELY.
    <span class="whitespace" />
    (there's nothing more to it)
    <span class="whitespace" />
    (just leave it)
    <span class="whitespace" />
    <span class="whitespace" />
    (please)
    <span class="whitespace" />
    <span class="whitespace" />
    <span class="whitespace" />
    (don't waste your time)
    <span class="whitespace" />
    <span class="whitespace" />
    <span class="whitespace" />
    <span class="whitespace" />
    <span on:click={() => phase++} style="cursor: pointer;">(leave now)</span>
  {:else if phase === 1}
    <h1>why didn't you listen to me</h1>
    <br />that's rude <br /><span class="hidden">(or is it? use 'dQw4w9WgXcQ')</span><br>
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
