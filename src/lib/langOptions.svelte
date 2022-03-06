<script lang="ts">
  import { lang } from '$lib/stores';

  import { getTextCollection, ITheme, randomHex, themeColors } from '$lib/vars';
  import { onMount } from 'svelte';

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

<style lang="scss">
  .picker {
    display: flex;
    flex-direction: column;
    text-align: center;

    * {
      width: 100%;
      padding: 10px;
      text-decoration: none;
      font-size: 14pt;
      cursor: pointer;
    }

    background-color: var(--navbar-bg1);
    .alt {
      background-color: var(--navbar-bg2);
    }
    color: white;
  }

  .bold {
    font-weight: bold;
    color: var(--accent);
  }

  @media (max-width: 600px) {
    * {
      text-align: center;
    }
  }
</style>
