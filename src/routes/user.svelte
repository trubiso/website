<script lang="ts">
  import { onMount } from 'svelte';

  onMount(async () => {
    await fetch('/api/users/logout?all');
    window.history.back();
  });
</script>
