<script lang="ts">
  export let title = 'trubiso';
  export let description: string | null = null;
</script>

<title>{title}</title>
<meta content={title} property="og:title" />
{#if description} <meta content={description} property="og:description" /> {/if}