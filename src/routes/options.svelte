<script>
  import LangOptions from '$lib/langOptions.svelte';
  import { lang } from '$lib/stores';
  import ThemeOptions from '$lib/themeOptions.svelte';
  import { getTitleOfPage } from '$lib/vars';
  import '../styles/options.scss';
</script>

<svelte:head>
  <title>{getTitleOfPage('options', $lang)}</title>
</svelte:head>

<main>
  <LangOptions />
  <ThemeOptions />
</main>
