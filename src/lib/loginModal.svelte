<script lang="ts">
  import { slide, blur, fly, scale, fade, crossfade } from 'svelte/transition';
  import { canScroll } from '$lib/stores';
  import { onDestroy, onMount } from 'svelte';
  import Emote from './emote.svelte';
  export let onDie: Function = () => {};

  onMount(() => {
    canScroll.set(false);
  });

  function kms() {
    canScroll.set(true);
    onDie();
  }

  let isLI = true;
  let error = '';
  let goodError = false;
  let loading = false;
  let form: HTMLFormElement;
  function login() {
    const d = new FormData(form);
    loading = true;
    fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: d.get('username'),
        password: d.get('password')
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          error = res.message;
          goodError = false;
          loading = false;
        } else {
          setTimeout(() => {
            location.reload();
          }, 500);
          kms();
        }
      });
  }

  function register() {
    const d = new FormData(form);

    if (d.get('confirmPassword') !== d.get('password')) {
      error = 'Passwords do not match';
      goodError = false;
      loading = false;
      return;
    }

    loading = true;
    fetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify({
        username: d.get('username'),
        password: d.get('password')
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          goodError = false;
          error = res.message;
        } else {
          isLI = true;
          goodError = true;
          error = 'REGISTARD SUCESFULI !';
        }
        loading = false;
      });
  }

  onDestroy(kms);
</script>

<main>
  <div class="box" transition:fly={{ y: 1000 }}>
    <div class="close" on:click={kms}><img src="/close.png" alt="X" /></div>
    {#if loading}
      <div class="spinner">
        <Emote name="silly" size="100" spinning />
      </div>
      <div class="login-text">
        {#if isLI} loginge in... {:else} registaring... {/if}
      </div>
    {:else}
      <h1>
        {#if isLI} LOGE IN !! {:else} REGISTAR !! {/if}
      </h1>
      <form action="" on:submit|preventDefault={isLI ? login : register} bind:this={form}>
        <div class="input" class:sa={!isLI}>
          <label for="username">uzernaem</label>
          <input type="text" name="username" id="username" placeholder="tongu" required />
        </div>
        <div class="input" class:sa={!isLI}>
          <label for="password">pasworde</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="veari seecret !"
            required
          />
        </div>
        {#if !isLI}
          <div class="input" class:sa={!isLI}>
            <label for="confirmPassword">confirme pasworde</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="don maek a mistak :P"
              required
            />
          </div>
        {/if}
        <div class="login">
          {#if isLI}
            <input type="submit" value="LOGE IN !!" />
          {:else}
            <input type="submit" value="REGISTAR !!" />
          {/if}
        </div>
      </form>
      <div class="register">
        <a
          href="#h"
          on:click|preventDefault={() => {
            isLI = !isLI;
          }}
        >
          {#if isLI} or meybi registar ! {:else} or meybi loge in ! {/if}
        </a>
      </div>
      <br />
      <br />
      {#if error}
        <div class="error" in:fly={{ x: -1000, duration: 250 }} class:success={goodError} out:fade>
          {#if goodError}
            <h2>YAYE !!&nbsp;<Emote name="flush_happy" size="30" /></h2>
          {:else}
            <h2>AAHE !!&nbsp;<Emote name="agony" size="30" /></h2>
          {/if}
          <span>{error}</span>
        </div>
      {/if}
      <div class="psa">
        <img src="/password_psa.png" alt="NEVAR !!!! tel yur pasword to ANIWON! >:(" />
      </div>
      <div class="smilie-platform" />
      <div class="footer">dis form is saef an has been chekd bay da govarnment of smilieland</div>
    {/if}
  </div>
  <div class="bg" on:click={kms} />
</main>

<style lang="scss">
  .box {
    outline: #000 solid 2px;
    padding: 10px;
    background: white;
    color: black;
    position: fixed;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 375px;
    height: 450px;
    text-align: center;
    border-radius: 1px;
    box-shadow: #000 0 0 10px;
    overflow: hidden;

    .spinner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }

    .error {
      display: flex;
      flex-direction: column;
      position: absolute;
      background-color: #ff3d1f;
      justify-content: center;
      align-items: center;
      padding: 10px;
      width: 200px;
      left: 10px;
      top: 227px;
      height: 150px;
      border-radius: 5px;

      &.success {
        background-color: #66e8ff;
      }

      span {
        flex: 1;
      }

      h2 {
        font-size: 1.5em;
        font-weight: bold;
      }
    }

    .close {
      display: flex;
      position: absolute;
      right: 0;
      top: 0;
      padding: 5px;
      margin: 5px;
      border-radius: 30px;
      border: #000 solid 1px;
      color: black;
      width: 30px;
      height: 30px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .login {
      margin-top: 5px;
      input {
        font-size: 11pt;
      }
    }

    .register {
      font-size: 10pt;
    }

    a {
      color: #d89e00;
    }

    .input {
      display: flex;
      padding: 2px;
      justify-content: center;
      align-items: center;

      label {
        display: flex;
        width: 70px;
        height: 25px;
        justify-content: right;
        align-items: center;
        margin-right: 5px;
      }
      input {
        width: 165;
        height: 22.5px;
      }

      &.sa {
        label {
          width: 130px;
        }
      }
    }

    h1 {
      font-family: 'Comic Sans MS';
    }

    .psa {
      position: absolute;
      right: 0;
      bottom: 40px;
    }

    .smilie-platform {
      position: absolute;
      left: 0;
      bottom: 40px;
      width: 100%;
      height: 20px;
      z-index: -1;
      background-color: #ffc600;
    }

    .footer {
      display: flex;
      height: 40px;
      font-size: 10pt;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      justify-content: center;
      background-color: black;
      color: white;
      align-items: center;
    }
  }

  .bg {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: all;
    overflow: hidden;
  }
</style>
