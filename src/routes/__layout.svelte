<script lang="ts">
  import Navbar from '$lib/navbar/Navbar.svelte';
  import { lang } from '$lib/stores';
  import { onMount } from 'svelte';
  import '../styles/globals.scss';

  onMount(() => {
    if (!isNaN(parseInt(localStorage.getItem('theme')))) {
      localStorage.setItem('theme', 'smilie');
    }

    if (localStorage.getItem('theme')) {
      document.documentElement.classList.add(localStorage.getItem('theme'));
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