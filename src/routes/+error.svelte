<script lang="ts">
	import { page } from '$app/stores';
	import EmoteZone from '$lib/text/EmoteZone.svelte';
</script>

<main>
  <h1>O NO!</h1>
	<p><EmoteZone>AHHHHHHHHHE ERROREEEEEEEEEE !!! HLEP MEEEEEEEEEEEEEEEEe!! :cri:</EmoteZone></p>
  <hr>
	<p><b>Code:</b> {$page.status}</p>
  <pre>{$page.error.message}</pre>
  <hr>
  <p><EmoteZone>:please: plz report to trunbiso (wif screenshot or copyinge, to disqord prenferabli). he wil tri to fiks :excited:</EmoteZone></p>
</main>
