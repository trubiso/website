<script lang="ts">
  import { lang, theme } from '$lib/stores';

  import { getTextCollection, ITheme, randomHex, themeColors } from '$lib/vars';

  const themeNames = getTextCollection('themes');
  const texts = getTextCollection('options.themes');

  let t: ITheme = themeColors.panda;
  let updateLive = true;

  // is called on every change
  function liveUpdate() {
    if (updateLive) saveTheme();
  }

  // generates a silly random theme
  function generateRandomTheme() {
    [t.navbarBG1, t.navbarBG2, t.navbarText, t.navbarAccent, t.accent, t.bg, t.text] = [
      randomHex(),
      randomHex(),
      randomHex(),
      randomHex(),
      randomHex(),
      randomHex(),
      randomHex()
    ];
    liveUpdate();
  }

  // updates the local colors upon theme changes
  theme.subscribe(() => {
    updateLocalColors();
  });

  // gets a theme name as it would be named in the css, relying on the english translation
  function getThemeName(themeIdx: number, k = '-') {
    return themeNames[0][themeIdx].replace(/ /g, k);
  }

  // sets the local colors to the global theme colors
  function updateLocalColors() {
    if (typeof $theme === 'string') {
      t = themeColors[$theme];
    } else {
      t = $theme;
    }
  }

  // changes the theme to one of the string themes
  function setTheme(v: string) {
    theme.set(v);
    liveUpdate();
  }

  // saves the current theme to the store / local storage
  function saveTheme() {
    for (const r in themeColors) {
      const m = themeColors[r] as ITheme;
      if (Object.values(t) === Object.values(m)) {
        theme.set(r.replace(' ', '_'));
        return;
      }
    }

    theme.set(t);
  }
</script>

<main>
  <h1>{texts[$lang][0]}</h1>
  <h2>{texts[$lang][1]}</h2>
  <div class="picker">
    {#each themeNames[$lang] as d, i}
      <div
        class="theme {getThemeName(i)}"
        class:bold={$theme === getThemeName(i, '_')}
        on:click={() => setTheme(getThemeName(i, '_'))}
      >
        {d}
      </div>
    {/each}
  </div>

  <h2>{texts[$lang][2]}</h2>
  <input type="submit" value={texts[$lang][3]} on:click={saveTheme} />
  <input type="checkbox" id="live-update" bind:checked={updateLive} />
  <label for="live-update">{texts[$lang][4]}</label>

  <div class="custom-colors">
    <div class="color-input">
      <input type="color" id="navbar-bg1" bind:value={t.navbarBG1} on:change={liveUpdate} />
      <label for="navbar-bg1">{texts[$lang][5]}</label>
    </div>
    <div class="color-input">
      <input type="color" id="navbar-bg2" bind:value={t.navbarBG2} on:change={liveUpdate} />
      <label for="navbar-bg2">{texts[$lang][6]}</label>
    </div>
    <div class="color-input">
      <input type="color" id="navbar-text" bind:value={t.navbarText} on:change={liveUpdate} />
      <label for="navbar-text">{texts[$lang][7]}</label>
    </div>
    <div class="color-input">
      <input type="color" id="navbar-accent" bind:value={t.navbarAccent} on:change={liveUpdate} />
      <label for="navbar-accent">{texts[$lang][8]}</label>
    </div>
    <div class="color-input">
      <input type="color" id="accent" bind:value={t.accent} on:change={liveUpdate} />
      <label for="accent">{texts[$lang][9]}</label>
    </div>
    <div class="color-input">
      <input type="color" id="bg" bind:value={t.bg} on:change={liveUpdate} />
      <label for="bg">{texts[$lang][10]}</label>
    </div>
    <div class="color-input">
      <input type="color" id="text" bind:value={t.text} on:change={liveUpdate} />
      <label for="text">{texts[$lang][11]}</label>
    </div>
  </div>

  <button on:click={generateRandomTheme}>{texts[$lang][12]}</button>
</main>
