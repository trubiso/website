<script lang="ts">
  import './style.scss';
  import { emotes, getTextCollection, navbarItems } from '../vars';
  import { lang, spiny } from '../stores';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import Account from './account.svelte';

  const itemNames = getTextCollection('navbar_items');

  let clicks = 0;

  export let sidebarOpen = false;

  function toggleSidebarOpen() {
    sidebarOpen = !sidebarOpen;
  }

  let matches = false;

  onMount(() => {
    const query = window.matchMedia('(min-width: 600px)');
    query.addListener((v) => (matches = v.matches));
    matches = query.matches;
  });
</script>

<nav class="navbar">
  <div class="header-wrapper">
    <div class="navbar-toggle" class:spin={sidebarOpen} on:click={toggleSidebarOpen}>▼</div>
    <div class="logo">
      {#if clicks < 10}
        <img src="/logo.png" alt="logo" on:click={() => clicks++} />
      {:else}
        <img
          src={emotes.get('silly')}
          alt="logo"
          on:click={() => clicks++}
          class:spinning={clicks >= 25}
          class:spinning-fast={clicks >= 50}
        />
      {/if}
    </div>
  </div>

  {#if sidebarOpen || matches}
    <div class="sidebar-wrapper" transition:slide>
      {#each itemNames[$lang] as item, idx}
        {#if idx !== itemNames[0].length - 1}
          <a
            href={navbarItems[idx]}
            class="navbar-item"
            class:bold={$page.url.pathname === navbarItems[idx]}>{item}</a
          >
        {:else}
          <a
            href={navbarItems[idx]}
            class="navbar-item navbar-item-special"
            class:bold={$page.url.pathname === navbarItems[idx]}
            on:contextmenu|preventDefault={() => spiny.set(true)}>{item}</a
          >
        {/if}
      {/each}
      <Account />
    </div>
  {/if}

  <div style="display: none;">trubiso.tk/awesome</div>
</nav>
