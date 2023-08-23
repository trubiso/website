<script lang="ts">
	import './StrainerOptions.scss';

	export let gridType: 'h' | 'v' = 'v';
</script>

<main class="strainer-options">
	<div class="option">
		<div class="title">grid type</div>
		<hr />
		<div class="body">
			<button on:click={() => gridType = 'h'}>h grid</button>
			<button on:click={() => gridType = 'v'}>v grid</button>
		</div>
	</div>
</main>
