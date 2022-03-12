<script lang="ts">
import { slide } from "svelte/transition";


import Emote from "./emote.svelte";
import { formatDate, ITodoItem } from "./vars";

export let item: ITodoItem;
</script>

<div class="todo-item" transition:slide>
  <div class="emote">
    {#if item.status === 'not-started'}
      <Emote name="sad3" />
    {:else if item.status === 'started'}
      <Emote name="glad" />
    {:else if item.status === 'in-progress'}
      <Emote name="whistling" /> <Emote name="computer_emotiguy" />
    {:else if item.status === 'done'}
      <Emote name="flush_happy" /> <Emote name="excited" />
    {/if}
  </div>
  <div class="bullet"><span>•</span></div>
  <div class="name"><b>{item.name}</b></div>
  {#if item.deadline}
    <div class="bullet"><span>•</span></div>
    <div class="deadline">
      <span>due&nbsp;{formatDate(new Date(item.deadline))}</span>
    </div>
  {:else}
    <div class="bullet"><span /></div>
    <div class="deadline" />
  {/if}
</div>