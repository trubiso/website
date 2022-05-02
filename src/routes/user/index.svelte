<script lang="ts">
  import Emote from '$lib/emote.svelte';

  import LoginModal from '$lib/loginModal.svelte';
  import { onMount } from 'svelte';

  export let username: string = '';
  export let loggedIn: boolean = false;

  let loginModal = false;

  onMount(async () => {
    const req = await fetch('/api/users/self');
    const res = await req.json();
    loggedIn = req.status !== 500;
    username = loggedIn ? res.user.username : '';
    if (loggedIn) {
      window.location.replace(`/user/${username}`);
    }
    loginModal = true;
  });
</script>

<main>
  <h1>user profil !</h1>
  <p>yu mus be logd in so i kno who yu ar !</p>
  <p>odarwies yu can visit somwans profiel ! <Emote name="happy" /></p>
  <button on:click={() => (loginModal = true)}>LOGE IN !</button>

  {#if loginModal}
    <LoginModal
      onDie={() => {
        loginModal = false;
      }}
    />
  {/if}
</main>
