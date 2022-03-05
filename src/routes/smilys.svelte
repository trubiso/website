<script lang="ts">
  import { getTextCollection, emotes, getTitleOfPage, sortArray, Sorts } from '$lib/vars';
  import { lang } from '$lib/stores';

  const sortOptions = getTextCollection('smilies.sorts');
  const sorts : Sorts[] = ['a-z', 'z-a', 'none', 'reverse', 'random'];
  const texts = getTextCollection('smilies.texts');

	const originalEmotes = Array.from(emotes.keys());
  let sortedEmotes = originalEmotes;
  let currentSort = sortOptions[$lang][2];

  const resortArray = () => {
    const sortIndex: number = sortOptions[$lang].findIndex((v) => v === currentSort);
    sortedEmotes = sortArray(originalEmotes, sorts[sortIndex]);
  };
</script>

<svelte:head>
  <title>{getTitleOfPage('smilies', $lang)}</title>
</svelte:head>

<main class="smilys">
  <h1>{getTitleOfPage('smilies', $lang)}</h1>
  {texts[$lang][0]}<a href="https://discord.gg/JY7PapMSFR" target="_blank">{texts[$lang][1]}</a
  >)
  <br /><span>{texts[$lang][2]}</span>
  <select name="sort" id="sort" bind:value={currentSort} on:change={resortArray}>
    {#each sortOptions[$lang] as opt}
      <option value={opt}>{opt}</option>
    {/each}
  </select>
  {#each sortedEmotes as emote, i}
    <div>
      <h2>{emote}</h2>
      <img src={emotes.get(emote)} alt="" />
      {#if i === 20}
        <span class="lucky">{texts[$lang][texts[$lang].length - 1]}</span>
      {/if}
    </div>
  {/each}
</main>

<style lang="scss">
  main.smilys {
    @media (max-width: 600px) {
      text-align: center;
    }

    span.lucky {
      cursor: default;
      color: var(--bg);
      position: absolute;
    }
  }
</style>
