<script lang="ts">
  import { lang, theme } from '$lib/stores';

  import { getTextCollection, ITheme, randomHex, themeColors, themeToString } from '$lib/vars';
  import Emote from './emote.svelte';
  import Hoverable from './hoverable.svelte';

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
    [
      t.navbarBG1,
      t.navbarBG2,
      t.navbarText,
      t.navbarAccent,
      t.accent,
      t.bg,
      t.text,
      t.cardBG,
      t.cardText,
      t.cardAccent
    ] = [
      randomHex(),
      randomHex(),
      randomHex(),
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
    t = { ...$theme };
  }

  // changes the theme to one of the string themes
  function setTheme(v: string) {
    theme.set(themeColors[v]);
    liveUpdate();
  }

  // saves the current theme to the store / local storage
  function saveTheme() {
    theme.set(t);
  }

  function exportTheme() {
    const themeString = (
      t.navbarBG1 +
      t.navbarBG2 +
      t.navbarText +
      t.navbarAccent +
      t.accent +
      t.bg +
      t.text
    ).replace(/#/g, '');
    console.log(themeString);
    const nums: string[] = ['', '', '', '', '', ''];
    for (let i = 0; i < themeString.length; i += 6) {
      nums[0] += themeString[i + 0];
      nums[1] += themeString[i + 1];
      nums[2] += themeString[i + 2];
      nums[3] += themeString[i + 3];
      nums[4] += themeString[i + 4];
      nums[5] += themeString[i + 5];
    }
    const exportedTheme = nums.join('');
    alert(`Theme code: ${exportedTheme}`);
  }

  function importTheme() {
    let themeString = prompt('Theme code');
    if (!themeString) return;
    themeString = themeString.trim();
    const nums: string[] = ['', '', '', '', '', '', ''];
    for (let i = 0; i < themeString.length; i += 7) {
      nums[0] += themeString[i + 0];
      nums[1] += themeString[i + 1];
      nums[2] += themeString[i + 2];
      nums[3] += themeString[i + 3];
      nums[4] += themeString[i + 4];
      nums[5] += themeString[i + 5];
      nums[6] += themeString[i + 6];
    }
    const exportedTheme = nums.join('');
    t.navbarBG1 = '#' + exportedTheme.slice(0, 6);
    t.navbarBG2 = '#' + exportedTheme.slice(6, 12);
    t.navbarText = '#' + exportedTheme.slice(12, 18);
    t.navbarAccent = '#' + exportedTheme.slice(18, 24);
    t.accent = '#' + exportedTheme.slice(24, 30);
    t.bg = '#' + exportedTheme.slice(30, 36);
    t.text = '#' + exportedTheme.slice(36, 42);
    liveUpdate();
  }
</script>

<main>
  <h1>{texts[$lang][0]}</h1>
  <h2>{texts[$lang][1]}</h2>
  <div class="picker">
    {#each themeNames[$lang] as d, i}
      <!--<Hoverable>-->
        <div
          class="theme"
          style={themeToString(themeColors[getThemeName(i, '_')])}
          on:click={() => setTheme(getThemeName(i, '_'))}
        >
          {d}
        </div>
      <!--</Hoverable>-->
    {/each}
  </div>

  <h2>{texts[$lang][2]}</h2>
  <div class="custom-container">
    <div class="custom-maker">
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
          <input
            type="color"
            id="navbar-accent"
            bind:value={t.navbarAccent}
            on:change={liveUpdate}
          />
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
        <div class="color-input">
          <input type="color" id="text" bind:value={t.cardBG} on:change={liveUpdate} />
          <label for="text">{texts[$lang][16]}</label>
        </div>
        <div class="color-input">
          <input type="color" id="text" bind:value={t.cardText} on:change={liveUpdate} />
          <label for="text">{texts[$lang][15]}</label>
        </div>
        <div class="color-input">
          <input type="color" id="text" bind:value={t.cardAccent} on:change={liveUpdate} />
          <label for="text">{texts[$lang][17]}</label>
        </div>
      </div>

      <button on:click={generateRandomTheme}>{texts[$lang][12]}</button>
      <button on:click={exportTheme}>{texts[$lang][13]}</button>
      <button on:click={importTheme}>{texts[$lang][14]}</button>
    </div>
    <div class="examples" style={themeToString(t)}>
      <div class="top-group">
        <div class="sample-text">
          <div class="text">
            <p>dis is how text luks !! :P</p>
            <p>loarem imspmsum dolore sitte amenteinges !! <Emote name="business" /></p>
            <p>consectetettur adscpsicisinginge elitte... <Emote name="youradhere" /></p>
          </div>
        </div>
        <div class="sample-navbar">
          <div class="arrow">▼ (togel arow)</div>
          <div>hoameings</div>
          <div>kitis</div>
          <div>toangs</div>
          <div class="accent">CLIK DIS !</div>
        </div>
      </div>
      <div class="sample-card">
        <h2>HALO !! I AM A CARDE !!</h2>
        <p class="accent">i hab special colore !! :O</p>
        <p>hehe eEeH!! <Emote name="silly" /> <Emote name="lik" /></p>
      </div>
    </div>
  </div>
</main>
