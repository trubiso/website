<script lang="ts">
  import { lang } from '$lib/stores';

  import { getTextCollection, ITheme, randomHex, themeColors } from '$lib/vars';
  import { onMount } from 'svelte';

  const themes = getTextCollection('themes');
  const texts = getTextCollection('options.themes');

  let navbarBG1: string,
    navbarBG2: string,
    navbarText: string,
    navbarAccent: string,
    accent: string,
    bg: string,
    text: string;
  navbarBG1 = navbarBG2 = text = '#000000';
  navbarText = navbarAccent = accent = bg = '#ffffff';
  let updateLive = true;
  let ct = '';

  function updateGlobalTheme() {
    document.documentElement.setAttribute(
      'style',
      `--navbar-bg1: ${navbarBG1}; --navbar-bg2: ${navbarBG2}; --navbar-text: ${navbarText}; --navbar-accent: ${navbarAccent}; --accent: ${accent}; --bg: ${bg}; --text: ${text};`
    );
    saveTheme();
  }

  function liveUpdate() {
    if (updateLive) updateGlobalTheme();
  }

  function randomTheme() {
    navbarBG1 = randomHex();
    navbarBG2 = randomHex();
    navbarText = randomHex();
    navbarAccent = randomHex();
    accent = randomHex();
    bg = randomHex();
    text = randomHex();
    liveUpdate();
  }

  onMount(() => {
    ct = localStorage.getItem('theme');
    updateThemeColors();
  });

  function getThemeName(themeIdx: number) {
    return themes[0][themeIdx].replace(/ /g, '-');
  }

  function updateThemeColors() {
    if (ct.includes('{')) {
      const theme = JSON.parse(ct) as ITheme;
      [navbarBG1, navbarBG2, navbarText, navbarAccent, accent, bg, text] = Object.values(theme);
    } else {
      [navbarBG1, navbarBG2, navbarText, navbarAccent, accent, bg, text] = Object.values(
        themeColors[ct.replace(/-/g, '_')]
      );
    }
  }

  function switchTheme(v: string) {
    localStorage.setItem('theme', v);
    document.documentElement.classList.replace(ct, v);
    ct = v;
    updateThemeColors();
    liveUpdate();
  }

  function saveTheme() {
    for (const t in themeColors) {
      const theme = themeColors[t];
      if (
        theme.navbar_bg1 === navbarBG1 &&
        theme.navbar_bg2 === navbarBG2 &&
        theme.navbar_text === navbarText &&
        theme.navbar_accent === navbarAccent &&
        theme.accent === accent &&
        theme.bg === bg &&
        theme.text === text
      ) {
        localStorage.setItem('theme', t);
        ct = t;
        return;
      }
    }
    localStorage.setItem(
      'theme',
      JSON.stringify({
        navbarBG1,
        navbarBG2,
        navbarText,
        navbarAccent,
        accent,
        bg,
        text
      })
    );
  }
</script>

<main>
  <h1>{texts[$lang][0]}</h1>
  <h2>{texts[$lang][1]}</h2>
  <div class="picker">
    {#each themes[$lang] as theme, i}
      <div
        class="theme {getThemeName(i)}"
        class:bold={ct === getThemeName(i).replace(/-/g, '_')}
        on:click={() => switchTheme(getThemeName(i))}
      >
        {theme}
      </div>
    {/each}
  </div>

  <h2>{texts[$lang][2]}</h2>
  <input type="submit" value={texts[$lang][3]} on:click={updateGlobalTheme} />
  <input type="checkbox" id="live-update" bind:checked={updateLive} />
  <label for="live-update">{texts[$lang][4]}</label>

  <div class="custom-colors">
    <div class="color-input">
      <input type="color" id="navbar-bg1" bind:value={navbarBG1} on:change={liveUpdate} />
      <label for="navbar-bg1">{texts[$lang][5]}</label>
    </div>
    <div class="color-input">
      <input type="color" id="navbar-bg2" bind:value={navbarBG2} on:change={liveUpdate} />
      <label for="navbar-bg2">{texts[$lang][6]}</label>
    </div>
    <div class="color-input">
      <input type="color" id="navbar-text" bind:value={navbarText} on:change={liveUpdate} />
      <label for="navbar-text">{texts[$lang][7]}</label>
    </div>
    <div class="color-input">
      <input type="color" id="navbar-accent" bind:value={navbarAccent} on:change={liveUpdate} />
      <label for="navbar-accent">{texts[$lang][8]}</label>
    </div>
    <div class="color-input">
      <input type="color" id="accent" bind:value={accent} on:change={liveUpdate} />
      <label for="accent">{texts[$lang][9]}</label>
    </div>
    <div class="color-input">
      <input type="color" id="bg" bind:value={bg} on:change={liveUpdate} />
      <label for="bg">{texts[$lang][10]}</label>
    </div>
    <div class="color-input">
      <input type="color" id="text" bind:value={text} on:change={liveUpdate} />
      <label for="text">{texts[$lang][11]}</label>
    </div>
  </div>

  <button on:click={randomTheme}>{texts[$lang][12]}</button>
</main>
