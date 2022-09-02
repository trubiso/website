<script lang="ts">
  import { sidebarLocation, sidebarStyle } from "$lib/stores";



</script>

<main>
  <label for="sidebarLocation">sidebar location</label>
  <input type="checkbox" name="sidebarLocation" id="sidebarLocation" bind:checked="{$sidebarLocation}">
  <br>
  <label for="sidebarStyle">sidebar style</label>
  <input type="checkbox" name="sidebarStyle" id="sidebarStyle" bind:checked="{$sidebarStyle}">
</main>