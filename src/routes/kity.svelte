<script lang="ts">
  import { getTitleOfPage } from '$lib/vars';
  import { lang } from '$lib/stores';

  let kity: HTMLElement;
  let isLoadingKity = true;

  const enableKities = () => {
    isLoadingKity = false;
  };

  const getNewKity = () => {
    isLoadingKity = true;
    kity.setAttribute('src', `https://placekitten.com/${Math.floor(Math.random() * 600 + 200)}`);
  };
</script>

<svelte:head>
  <title>{getTitleOfPage('kitty', $lang)}</title>
</svelte:head>

<main class="kity">
  <img
    src="https://placekitten.com/{Math.floor(Math.random() * 600 + 200)}"
    alt="kity"
    id="kity"
    bind:this={kity}
    on:load={enableKities}
  />
  <br />
  <button on:click={getNewKity} id="moarkity" disabled={isLoadingKity}>
    {#if isLoadingKity}
      geting kity...
    {:else}
      get mor kity
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
    }
  }
</style>
