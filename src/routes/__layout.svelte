<script lang="ts">
  import Emote from '$lib/emote.svelte';
  import Flowers from '$lib/flowers.svelte';
  import Navbar from '$lib/navbar/Navbar.svelte';
  import { fishy, lang, theme } from '$lib/stores';
  import { ITheme, themeColors } from '$lib/vars';
  import { onMount } from 'svelte';
  import '../styles/globals.scss';

  let ct: ITheme | string = 'q';

  onMount(() => {
    const lt = localStorage.getItem('theme');
    if (!lt) theme.set('smilie');
    else if (lt.includes('{')) theme.set(JSON.parse(lt));
    else theme.set(lt);
    theme.subscribe((v) => {
      if (typeof $theme === 'string') {
        if (typeof ct !== 'string' || ct === 'q') {
          document.documentElement.setAttribute('style', '');
          document.documentElement.classList.add(($theme as string).replace(/_/, '-'));
        } else {
          document.documentElement.classList.replace(
            (ct as string).replace(/_/, '-'),
            $theme.replace(/_/, '-')
          );
        }
      } else {
        if (typeof ct === 'string') {
          document.documentElement.classList.remove((ct as string).replace(/_/, '-'));
        }
        document.documentElement.setAttribute(
          'style',
          `--navbar-bg1: ${$theme.navbarBG1}; --navbar-bg2: ${$theme.navbarBG2}; --navbar-text: ${$theme.navbarText}; --navbar-accent: ${$theme.navbarAccent}; --accent: ${$theme.accent}; --bg: ${$theme.bg}; --text: ${$theme.text};`
        );
      }

      ct = v;
      localStorage.setItem('theme', typeof ct === 'string' ? ct : JSON.stringify(ct));
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
    content={typeof ct == 'string'
      ? themeColors[ct === 'q' ? 'smilie' : ct].navbarBG1
      : ct.navbarBG1}
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
