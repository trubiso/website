<script lang="ts">
  import { getTextCollection, getTitleOfPage } from '$lib/vars';
  import { lang } from '$lib/stores';
  import Meta from '$lib/meta.svelte';

  let kity: HTMLElement;
  let isLoadingKity = true;

  const texts = getTextCollection('kitty');

  const enableKities = () => {
    isLoadingKity = false;
  };

  const getNewKity = () => {
    isLoadingKity = true;
    kity.setAttribute('src', `https://placekitten.com/${Math.floor(Math.random() * 600 + 200)}`);
  };

  const meow = () => {
    new Audio('./meow.mp3').play();
  };
</script>

<Meta
  title={getTitleOfPage('kitty', $lang)}
  description="obtain quality kitties for enjoyment and happiness"
/>

<main class="kity">
  <img
    src="https://placekitten.com/{Math.floor(Math.random() * 600 + 200)}"
    alt="kity"
    id="kity"
    bind:this={kity}
    on:load={enableKities}
    on:click={meow}
    draggable=false
  />
  <br />
  <button on:click={getNewKity} id="moarkity" disabled={isLoadingKity}>
    {#if isLoadingKity}
      {texts[$lang][0]}
    {:else}
      {texts[$lang][1]}
    {/if}
  </button>
</main>

<style lang="scss">
  main.kity {
    @media (max-width: 600px) {
      text-align: center;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      cursor: grab;
      &:active {
        cursor: grabbing;
      }
      user-select: none;
    }
  }
</style>
