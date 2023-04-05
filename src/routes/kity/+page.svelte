<script lang="ts">
	import { t } from '$lib/localization';
	import './style.scss';

	let kitty: HTMLImageElement;
	let loading = true;

	function enableButton() {
		loading = false;
	}

	function randomImage() {
		return `https://placekitten.com/${Math.floor(Math.random() * 600 + 200)}`;
	}

	function newImage() {
		loading = true;
		kitty.setAttribute('src', randomImage());
	}

	function meow() {
		new Audio('./meow.mp3').play();
	}
</script>

<main class="kitty">
	<div>
		<img
			src={randomImage()}
			alt="kity"
			id="kity"
			bind:this={kitty}
			on:load={enableButton}
			on:click={meow}
		/>
	</div>
	<button on:click={newImage} disabled={loading}>
		{#if loading}
			{$t('kitty.loading')}
		{:else}
			{$t('kitty.new')}
		{/if}
	</button>
</main>
