<script lang="ts">
  import { spiny } from './stores';

  import { emotes } from './vars';
  export let name = 'happy';
  export let size = '22';
  export let spinning = false;
  const link = emotes.get(name);
</script>

<div class="emote">
  <img
    src={link}
    alt=":{name}:"
    height={size}
    title=":{name}:"
    class:spinning={spinning || $spiny}
  />
</div>

<style lang="scss">
  @import '../styles/keyframes';

  .emote {
    display: inline;
    img {
      vertical-align: middle;
      line-height: normal;

      &.spinning {
        animation: spinScale 0.5s infinite linear;
      }
    }
  }
</style>
