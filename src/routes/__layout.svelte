<script lang="ts">
  import Navbar from '$lib/navbar/Navbar.svelte';
  import { lang } from '$lib/stores';
  import type { ITheme } from '$lib/vars';
  import { onMount } from 'svelte';
  import '../styles/globals.scss';

  onMount(() => {
    if (!isNaN(parseInt(localStorage.getItem('theme')))) {
      localStorage.setItem('theme', 'smilie');
    }

    if (localStorage.getItem('theme')) {
      const theme = localStorage.getItem('theme');
      if (theme.includes('{')) {
        const parsedTheme = JSON.parse(theme) as ITheme;
        document.documentElement.setAttribute(
          'style',
          `--navbar-bg1: ${parsedTheme.navbarBG1}; --navbar-bg2: ${parsedTheme.navbarBG2};` +
            `--navbar-text: ${parsedTheme.navbarText}; --accent: ${parsedTheme.accent};` +
            `--bg: ${parsedTheme.bg}; --text: ${parsedTheme.text};`
        );
      } else {
        document.documentElement.classList.add(theme);
      }
    } else {
      localStorage.setItem('theme', 'smilie'); // bg hasnt isnt
      document.documentElement.classList.add('smilie');
    }
    lang.set(parseInt(window.localStorage.getItem('lang') ?? '0'));
    lang.subscribe((v) => {
      window.localStorage.setItem('lang', v.toString());
    });
  });

  let sidebarOpen = false;
</script>

<Navbar bind:sidebarOpen />
<main class="content" class:content-sidebar-open={sidebarOpen}>
  <slot />
</main>
