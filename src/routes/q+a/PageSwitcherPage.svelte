<script lang="ts">
	import './PageSwitcherPage.scss';
	import PageSwitcherPageSelector from './PageSwitcherPageSelector.svelte';

	export let number: number;
	export let defaultNumber: number = number;
	export let maximumPage: number = number;
	export let current = false;
	export let overrideStyle: string | null = null;

	const isSelect = +number === -1;
	let shouldShowSelector = false;

	function onClick() {
		if (current) return;
		if (isSelect) {
			shouldShowSelector = !shouldShowSelector;
		} else {
			location.search = `?page=${number}`;
		}
	}
</script>

<main class="page-switcher-page">
	<button on:click={onClick} class:current class:is-select={isSelect}>
		<span>{isSelect ? '...' : overrideStyle ?? number}</span>
	</button>
	{#if shouldShowSelector}
		<PageSwitcherPageSelector maximumNumber={maximumPage} {defaultNumber} />
	{/if}
</main>
