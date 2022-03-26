<script lang="ts">
  export let title = 'trubiso';
  export let metatitle: string | null = null;
  export let description: string | null = null;
</script>

<title>{title}</title>
<meta content={metatitle ?? title} property="og:title" />
{#if description !== null} <meta content={description} property="og:description" /> {/if}