<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async (req) => {
    return {
      status: 200,
      props: {
        item: req.params['list']
      }
    };
  };
</script>

<script lang="ts">
  import type { ITodoList } from '$lib/vars';
  import { onMount } from 'svelte';
  import { todo } from '$lib/stores';
  import TodoItem from '$lib/todoItem.svelte';
  import '../../styles/todolist.scss';

  export let item: string;
  export let list: ITodoList;

  let loaded = false;

  onMount(() => {
    list = $todo.find((v) => v.name === item);
    if (!list) {
      window.location.replace(window.location.protocol + '/404');
    }
    loaded = true;
  });
  
</script>

<main>
  {#if loaded}
    <h1>to-do / {list.name}</h1>
    <div class="items">
      {#each list.items as item}
        <TodoItem {item} />
      {/each}
    </div>
  {/if}
</main>