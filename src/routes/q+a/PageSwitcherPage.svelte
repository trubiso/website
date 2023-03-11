<script lang="ts">
	import './PageSwitcherPage.scss';

	export let number: number;
	export let current = false;
	export let overrideStyle: string | null = null;

	const isSelect = +number === -1;
	let shouldShowSelector = false;

	function onClick() {
		if (isSelect) {
			shouldShowSelector = !shouldShowSelector;
		} else {
			location.search = `?page=${number}`;
		}
	}
</script>

<main class="page-switcher-page">
	<button on:click={onClick} class:current>
		<span>{isSelect ? "..." : overrideStyle ?? number}</span>
	</button>
	
</main>
