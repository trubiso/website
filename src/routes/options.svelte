<script>
  import Emote from '$lib/emote.svelte';
  import LangOptions from '$lib/langOptions.svelte';
  import Meta from '$lib/meta.svelte';
  import { fishy, lang, sidebarLocation } from '$lib/stores';
  import ThemeOptions from '$lib/themeOptions.svelte';
  import { getTitleOfPage } from '$lib/vars';
  import { onMount } from 'svelte';
  import '../styles/options.scss';

  let fishyOn = !$fishy;
  let locationSelect = '0';
  sidebarLocation.subscribe((v) => (locationSelect = v.toString()));

  let matches = false;

  onMount(() => {
    const query = window.matchMedia('(max-width: 600px)');
    query.addListener((v) => (matches = v.matches));
    matches = query.matches;
  });
</script>

<Meta
  title={getTitleOfPage('options', $lang)}
  description="customize your experience in the trubiso.tk website!"
/>

<main>
  <LangOptions />
  <ThemeOptions />
  <br />
  <span>
    <input type="checkbox" id="fishy" bind:checked={fishyOn} on:click={() => fishy.set(fishyOn)} />
    <label for="fishy"><Emote name="swim" /></label>
  </span>
  <br /> <br />
  <span>
    <label for="sidebar-location">siedbar</label>
    <select
      name="sidebarLocation"
      id="sidebar-location"
      bind:value={locationSelect}
      on:change={() => sidebarLocation.set(parseInt(locationSelect))}
    >
      <option value="0"> {#if matches}↑{:else}←{/if} </option>
      <option value="1"> {#if matches}↓{:else}→{/if} </option>
    </select>
  </span>
</main>
