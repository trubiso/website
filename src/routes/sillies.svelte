<script>
  import Emote from '$lib/emote.svelte';
  import { onMount } from 'svelte';

  let size = 100;
  let q = Array(size);

  function incrementSilliness() {
    size += 100;
    q = Array(size);
    setTimeout(incrementSilliness, 500);
  }

  onMount(() => incrementSilliness());
</script>

<svelte:head>
  <title>silliness</title>
</svelte:head>

<main>
  {#each q as _}
    <Emote name="silly" spinning />
  {/each}
</main>
