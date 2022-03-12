<script lang="ts">
  import type { ITodoList } from './vars';

  import './todoList.scss';
  import TodoItem from './todoItem.svelte';

  export let list: ITodoList;
</script>

<div class="todo-list">
  <a href="/todo/{list.name}" class="todo-list-name">
    {list.name}
  </a>
  {#each list.items.slice(0, 7) as item}
    <TodoItem {item} />
  {/each}
  ...
</div>
