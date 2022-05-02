<script context="module" lang="ts">
  import EmoteText from '$lib/emoteText.svelte';
  import type { profile as Profile, user as User } from '@prisma/client';
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  export const load: Load = async (req) => {
    const url = `/api/users/self?username=${req.params['username']}`;
    const res = await req.fetch(url);
    if (res.status === 500) {
      return {
        status: 404
      };
    }
    const fetched = await res.json();
    return {
      status: 200,
      props: {
        user: fetched.user,
        profile: fetched.profile
      }
    };
  };
</script>

<script lang="ts">
  export let user: User;
  export let profile: Profile;
  let mainElem: HTMLElement;

  let isOwn = false;

  async function checkOwn() {
    const res = await fetch(`/api/users/self`);
    if (res.status === 500) {
      return;
    }
    const fetched = await res.json();
    isOwn = fetched.user.id === user.id;
  }

  onMount(async () => {
    mainElem.setAttribute(
      'style',
      `--bg:${profile.isBgLink ? `url(${profile.bg})` : profile.bg};--accent:${
        profile.accent
      };--text:${profile.text};--banner:url(${profile.banner});`
    );

    await checkOwn();
  });

  function logOut() {
    fetch('/api/users/logout').then(() => {
      window.location.replace('/user');
    });
  }
</script>

<main class:accent={!!profile.accent} class:text={!!profile.text} bind:this={mainElem}>
  {#if profile.bg}
    <div class="bg" class:bg-link={profile.isBgLink} class:bg-tile={profile.isBgTile} />
  {/if}
  {#if profile.banner}
    <div class="banner" />
  {/if}
  <div class="banner-aid" />
  {#if profile.avatar}
    <img src={profile.avatar} alt="{user.username} avatar !" class="avatar" />
  {/if}
  {#if profile.name}
    <h1 class="name"><EmoteText text={profile.name} size="44" /></h1>
    <h2 class="reality">@{user.username}</h2>
  {:else}
    <h1 class="name">@{user.username}</h1>
  {/if}
  {#if profile.bio}
    <div class="bio">
      <span><EmoteText text={profile.bio} /></span>
    </div>
  {/if}
  {#if profile.location}
    <span>locetion: <EmoteText text={profile.location} /></span>
  {/if}
  {#if profile.website}
    websiet: <a href={profile.website}>{profile.website}</a>
  {/if}
</main>

<style lang="scss">
  main {
    width: 100%;
    height: 100%;

    .bio {
      display: flex;
      margin-left: 10px;
      padding: 10px;
      width: 400px;
      justify-content: space-between;
      text-align: justify;
      margin-top: 25px;
      background-color: #0001;

      white-space: pre-line;

      span {
        font-size: 14pt;
      }
    }

    .avatar {
      top: 270px;
      left: 270px;
      width: 150px;
      height: 150px;
    }

    h1.name {
      margin-bottom: 0px;
      margin-top: -50px;
      margin-left: 180px;
    }

    h2.reality {
      margin-top: 5px;
      opacity: 50%;
      font-size: 14pt;
      margin-left: 180px;
    }

    &.text {
      color: var(--text);
    }

    .avatar,
    .banner {
      position: absolute;
      margin-left: -30px;
      margin-top: -30px;
    }

    .banner {
      top: 75px;
      width: 1025px;
      height: 250px;

      background: var(--banner);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .banner-aid {
      width: 100%;
      height: 325px;
    }

    .bg {
      position: absolute;
      margin-left: -30px;
      margin-top: -30px;
      width: calc(100% - 200px);
      height: 100%;

      z-index: -1;

      background-color: var(--bg);
      &.bg-link {
        background-position: center;
        background-image: var(--bg);
        background-repeat: no-repeat;
        background-size: cover;
        &.bg-tile {
          background-repeat: repeat;
          background-size: auto;
        }
      }
    }
  }
</style>
