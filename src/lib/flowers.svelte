<script lang="ts">
  import { onMount } from 'svelte';

  let flower: HTMLImageElement;

  function flowerFlowering() {
    setTimeout(() => {
      flower.src = "/flowers.gif";
      setTimeout(() => {
        flower.src = "/unflowers.gif";
        setTimeout(flowerFlowering, Math.random() * 10000);
      }, Math.random() * 50000);
    }, Math.random() * 100000);
  }

  onMount(() => {
    flowerFlowering();
  });
</script>

<main>
  <img bind:this={flower} src="" alt=" " class="flower" width="406" height="365" />
</main>

<style lang="scss">
  .flower {
    z-index: 0;
    position: fixed;
    right: 0;
    top: 0;
    display: block;
    height: 406px;
    width: 365px;
    pointer-events: none;
  }

  @media (max-width: 600px) {
    .flower {
      height: 260px;
      width: 230px;
      margin-top: 70px;
    }
  }
</style>
