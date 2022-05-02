<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async (req) => {
    return {
      status: 200,
      props: {
        username: req.params['username']
      }
    };
  };
</script>

<script lang="ts">
  export let username = '';

  function logOut() {
    fetch('/api/users/logout').then(() => {
      window.location.replace('/user');
    });
  }
</script>

<a href="#h" on:click|preventDefault={logOut}>loge out from {username}</a>