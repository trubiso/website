<script lang="ts">
  import Emote from './emote.svelte';
  import { emotes } from './vars';

  export let text: string;
  export let size = '22';
  export let html = false;

  const emoteNames = Array.from(emotes.keys());
  const joinedNames = emoteNames.join('|');
  const regex = new RegExp(`:(${joinedNames}):`, 'g');

  const splitText: string[] = text.split(regex).filter((v) => v);
  let emoteText = splitText.map((v) => ({ text: v, emote: emoteNames.includes(v) }));
</script>

<span>
  {#each emoteText as e}
    {#if e.emote}
      <Emote name={e.text} {size} />
    {:else if html}
      {@html e.text}
    {:else}
      {e.text}
    {/if}
  {/each}
</span>
