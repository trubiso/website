<script>
  import { getTitleOfPage } from '$lib/vars';
  import { lang } from '$lib/stores';
</script>

<svelte:head>
  <title>{getTitleOfPage('games', $lang)}</title>
</svelte:head>
WIPe !!
