<script>
  import Emote from '$lib/emote.svelte';
  import Meta from '$lib/meta.svelte';
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

<Meta title="silliness" description={[...Array(100).keys()].map((_) => ':silly:').join('')} />

<main>
  {#each q as _}
    <Emote name="silly" spinning />
  {/each}
</main>
