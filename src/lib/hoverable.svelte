<script lang="ts">
import { slide } from "svelte/transition";


  let hovering = false;
</script>

<div on:mouseenter={() => (hovering = true)} on:mouseleave={() => (hovering = false)} style="width:100%;padding:0%;">
  <slot />
  {#if hovering}
    <div transition:slide>
			<h3>
				hi
			</h3>
		</div>
	{/if}
</div>
