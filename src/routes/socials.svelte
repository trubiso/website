<script lang="ts">
  import { lang } from '$lib/stores';
  import { socialMedias, getTitleOfPage } from '$lib/vars';
</script>

<svelte:head>
  <title>{getTitleOfPage('about', $lang)}</title>
</svelte:head>

<section>
  <h1>{getTitleOfPage('about', $lang)}</h1>
  <ul>
    {#each Array.from(socialMedias.entries()) as [name, data]}
      <li>
        {name}: {#if data.link}
          <a href={data.link} target="_blank">{data.name}</a>
        {:else}
          <span>{data.name}</span>
        {/if}
      </li>
    {/each}
  </ul>
</section>
