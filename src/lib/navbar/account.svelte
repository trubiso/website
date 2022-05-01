<script lang="ts">
  import LoginModal from '$lib/loginModal.svelte';
  import { onMount } from 'svelte';

  export let id: string = '';
  export let username: string = '';
  export let loggedIn: boolean = false;

  let loggingIn = false;

  onMount(async () => {
    const req = await fetch(`/api/users/self`, { method: 'GET' });
    const fetched = await req.json();
    loggedIn = !fetched.error;
    id = fetched.user.id;
    username = fetched.user.username;
  });
</script>

<main class="navbar-item-bottom">
  {#if loggedIn}
    <a class="navbar-item navbar-item-special" href="/user">{username}</a>
  {:else}
    <div class="navbar-item navbar-item-special" on:click={() => (loggingIn = true)}>loge in ?</div>
  {/if}
  {#if loggingIn}
    <LoginModal onDie={() => (loggingIn = false)} />
  {/if}
</main>
