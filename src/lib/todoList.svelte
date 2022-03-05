<script lang="ts">
  import { formatDate, ITodoList } from './vars';

  import './todoList.scss';

  export let list: ITodoList;
</script>

<div class="todo-list">
  <div class="todo-list-name">
    {list.name}
  </div>
  {#each list.items.slice(0, 3) as item}
    <div class="todo-item">
      <b>{item.name}</b>
      {#if item.deadline}
        due <i>{formatDate(item.deadline)}</i>
      {/if}
    </div>
  {/each}
  <div class="todo-list-edit">Edit</div>
</div>
