<script lang="ts">
  import Emote from '$lib/emote.svelte';
  import Flowers from '$lib/flowers.svelte';
  import Navbar from '$lib/navbar/Navbar.svelte';
  import { fishy, lang, theme } from '$lib/stores';
  import { combineTheme, ITheme, themeToString } from '$lib/vars';
  import { onMount } from 'svelte';
  import '../styles/globals.scss';

  let ct: ITheme = combineTheme();

  onMount(() => {
    const lt = localStorage.getItem('theme');
    theme.set(lt ? JSON.parse(lt) : combineTheme());
    theme.subscribe((v) => {
      document.documentElement.setAttribute(
        'style',
        themeToString($theme)
      );

      ct = v;
      localStorage.setItem('theme', JSON.stringify(ct));
    });

    lang.set(parseInt(window.localStorage.getItem('lang') ?? '0'));
    lang.subscribe((v) => {
      window.localStorage.setItem('lang', v.toString());
    });

    fishyArray = [...Array(Math.floor(window.screen.width / 16))];
  });

  let sidebarOpen = false;
  let fishyArray = [];
</script>

<svelte:head>
  <meta
    content={ct.navbarBG1}
    data-react-helmet="true"
    name="theme-color"
  />
</svelte:head>

<Navbar bind:sidebarOpen />
<!--<Flowers />-->
<main class="content" class:content-sidebar-open={sidebarOpen}>
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
