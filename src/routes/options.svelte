<script>
  import Emote from '$lib/emote.svelte';
  import LangOptions from '$lib/langOptions.svelte';
  import Meta from '$lib/meta.svelte';
  import { fishy, lang, sidebarLocation } from '$lib/stores';
  import ThemeOptions from '$lib/themeOptions.svelte';
  import { getTitleOfPage } from '$lib/vars';
  import '../styles/options.scss';

  let fishyOn = !$fishy;
  let locationSelect = '0';
  sidebarLocation.subscribe((v) => (locationSelect = v.toString()));
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
      <option value="0">←</option>
      <option value="1">→</option>
    </select>
  </span>
</main>
