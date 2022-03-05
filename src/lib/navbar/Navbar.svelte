<script lang="ts">
  import './style.scss';
  import { emotes, getTextCollection, navbarItems } from '../vars';
  import { lang } from '../stores';
  import ThemePicker from './themePicker.svelte';
  import LangPicker from './langPicker.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  const itemNames = getTextCollection('navbar_items');

  let tPicker = false,
    lPicker = false,
    sidebarOpen = false,
    clicks = 0;

  function togglePickers(tp = false) {
    if (tp) {
      tPicker = !tPicker;
      if (lPicker) lPicker = false;
    } else {
      lPicker = !lPicker;
      if (tPicker) tPicker = false;
    }
  }

  function toggleSidebarOpen() {
    sidebarOpen = !sidebarOpen;
    if (!sidebarOpen) {
      tPicker = false;
      lPicker = false;
    }
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
        {#if navbarItems[idx]}
          <a
            href={navbarItems[idx]}
            class="navbar-item"
            class:bold={$page.url.pathname === navbarItems[idx]}>{item}</a
          >
        {/if}
      {/each}
      <div class="navbar-item" class:bold={tPicker} on:click={() => togglePickers(true)}>
        {itemNames[$lang][itemNames[$lang].length - 2]}
      </div>
      {#if tPicker}
        <ThemePicker />
      {/if}
      <div class="navbar-item" class:bold={lPicker} on:click={() => togglePickers()}>
        {itemNames[$lang][itemNames[$lang].length - 1]}
      </div>
      {#if lPicker}
        <LangPicker />
      {/if}
    </div>
  {/if}

  <div style="display: none;">trubiso.tk/awesome</div>
</nav>
