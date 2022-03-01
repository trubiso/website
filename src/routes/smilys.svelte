<script lang="ts">
  import { getTextCollection, emotes, getTitleOfPage } from '$lib/vars';
  import { lang } from '$lib/stores';

  const sortOptions = getTextCollection('smilies.sorts');
  const sorts = ['a-z', 'z-a', 'old-new', 'new-old', 'random'];
  const topText = getTextCollection('smilies.texts');
  const lucky2883 = topText.at(-1);

	const originalEmotes = Array.from(emotes.keys());
  let sortedEmotes = originalEmotes;
  let currentSort = sortOptions[$lang][2];

  const resortArray = () => {
    const sortIndex: number = sortOptions[$lang].findIndex((v) => v === currentSort);
    switch (sorts[sortIndex]) {
      case 'a-z':
				sortedEmotes = [...sortedEmotes].sort();
        break;
      case 'z-a':
				sortedEmotes = [...sortedEmotes].sort().reverse();
        break;
      case 'old-new':
        sortedEmotes = [...originalEmotes];
        break;
      case 'new-old':
        sortedEmotes = [...originalEmotes].reverse();
        break;
      case 'random':
        sortedEmotes = [...originalEmotes].sort(() => 0.5 - Math.random());
        break;
    }
  };
</script>

<svelte:head>
  <title>{getTitleOfPage('smilies', $lang)}</title>
</svelte:head>

<main class="smilys">
  <h1>{getTitleOfPage('smilies', $lang)}</h1>
  {topText[$lang][0]}<a href="https://discord.gg/JY7PapMSFR" target="_blank">{topText[$lang][1]}</a
  >)
  <br /><span>{topText[$lang][2]}</span>
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
        <span class="lucky">{lucky2883[$lang]}</span>
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
