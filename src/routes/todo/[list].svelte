<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async (req) => {
    return {
      status: 200
    };
  };
</script>

<script lang="ts">
import type { ITodoList } from '$lib/vars';
import { get } from 'svelte/store';

  export let list: ITodoList;
</script>

<h1>{list}</h1>
