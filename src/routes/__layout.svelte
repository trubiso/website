<script lang="ts">
  import Emote from '$lib/emote.svelte';
  import Flowers from '$lib/flowers.svelte';
  import Navbar from '$lib/navbar/Navbar.svelte';
  import { canScroll, fishy, lang, theme, sidebarLocation } from '$lib/stores';
  import { ITheme, themeColors, themeToString } from '$lib/vars';
  import { onMount } from 'svelte';
  import '../styles/globals.scss';

  let ct: ITheme | string = themeColors.smilie;

  onMount(() => {
    const lt = localStorage.getItem('theme');
    theme.set(lt ? JSON.parse(lt) : themeColors.smilie);
    theme.subscribe((v) => {
      document.documentElement.setAttribute('style', themeToString($theme));

      ct = v;
      localStorage.setItem('theme', JSON.stringify(ct));
    });

    lang.set(parseInt(window.localStorage.getItem('lang') ?? '0'));
    lang.subscribe((v) => {
      window.localStorage.setItem('lang', v.toString());
    });

    sidebarLocation.set(parseInt(window.localStorage.getItem('sidebarLocation') ?? '0'))
    sidebarLocation.subscribe((v) => {
      window.localStorage.setItem('sidebarLocation', v.toString());
      console.log($sidebarLocation);
    });

    fishyArray = [...Array(Math.floor(window.screen.width / 16))];
  });

  let sidebarOpen = false;
  let fishyArray = [];
</script>

<svelte:head>
  <meta
    content={typeof ct == 'string'
      ? themeColors[ct === 'q' ? 'smilie' : ct].navbarBG1
      : ct.navbarBG1}
    data-react-helmet="true"
    name="theme-color"
  />
</svelte:head>

<Navbar bind:sidebarOpen location={$sidebarLocation} />
<!--<Flowers />-->
<main
  class="content"
  class:content-sidebar-open={sidebarOpen}
  class:noscroll={!$canScroll}
  class:left-margin={$sidebarLocation === 0}
  class:right-margin={$sidebarLocation === 1}
>
  <slot />
</main>

{#if !$fishy}
  <div class="fish" width="100%">
    <div class="fishy">
      {#each fishyArray as _}
        <Emote name="swim" size="32" />&nbsp;
      {/each}
    </div>
  </div>
{/if}
