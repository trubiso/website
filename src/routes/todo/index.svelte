<script lang="ts">
  import Emote from '$lib/emote.svelte';
import Meta from '$lib/meta.svelte';
  import { todo } from '$lib/stores';
  import TodoList from '$lib/todoList.svelte';

  import { onMount } from 'svelte';

  let hasLoaded = false;
  onMount(() => {
    hasLoaded = true;
  });
</script>

<Meta title="todo" description="make your own SMILIE to-do lists!" />

<main>
  {#if !hasLoaded}
    loading lists...
    <Emote name="silly" spinning />
  {:else}
    <div class="todo-lists">
      {#each $todo as list}
        <TodoList {list} />
      {/each}
    </div>
  {/if}
</main>

<style lang="scss">
  .todo-lists {
    display: flex;
    flex-direction: column;
    @media (max-width: 600px) {
      justify-content: center;
    }
  }
</style>
