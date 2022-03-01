<script lang="ts">
  import { onMount } from 'svelte';
  import { getTextCollection } from '../vars';
  import { lang } from '$lib/stores';
  import { slide } from 'svelte/transition';

  let ct = 'smilie';

  const themes = getTextCollection('themes');
  function switchTheme(theme: string) {
    const themeName = theme.replace(/ /g, '-');
    document.documentElement.classList.replace(ct, themeName);
    localStorage.setItem('theme', themeName);
    ct = themeName;
  }

  onMount(() => {
    ct = localStorage.getItem('theme');
  });
</script>

<div class="picker" transition:slide>
  {#each themes[$lang] as theme, i}
    <div
      class:bold={ct === themes[0][i].replace(/ /g, '-')}
      on:click|preventDefault={() => switchTheme(themes[0][i])}
    >
      {theme}
    </div>
  {/each}
</div>
