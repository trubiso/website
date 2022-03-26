<script>
  import Emote from '$lib/emote.svelte';
  import LangOptions from '$lib/langOptions.svelte';
  import Meta from '$lib/meta.svelte';
  import { fishy, lang } from '$lib/stores';
  import ThemeOptions from '$lib/themeOptions.svelte';
  import { getTitleOfPage } from '$lib/vars';
  import '../styles/options.scss';

  let fishyOn = !$fishy;
</script>

<Meta title={getTitleOfPage('options', $lang)} />

<main>
  <LangOptions />
  <ThemeOptions />
  <br />
  <span>
    <input type="checkbox" id="fishy" bind:checked={fishyOn} on:click={() => fishy.set(fishyOn)} />
    <label for="fishy"><Emote name="swim" /></label>
  </span>
</main>
