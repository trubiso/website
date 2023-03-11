<script lang="ts">
	import './PageSwitcher.scss';
	import PageSwitcherPage from './PageSwitcherPage.svelte';

	export let hasPreviousPage: boolean;
	export let hasNextPage: boolean;
	export let currentPage: number;
	export let maximumPage: number;

	const pages: number[] = [];
	if (currentPage > 2) pages.push(currentPage - 2);
	if (currentPage > 1) pages.push(currentPage - 1);
	pages.push(currentPage);
	pages.push(-1);
	if (maximumPage > currentPage) pages.push(+currentPage + 1);
	if (maximumPage > +currentPage + 1) pages.push(+currentPage + 2);
</script>

<main class="page-switcher">
	<div class="lefters">
		<PageSwitcherPage number={1} overrideStyle="<<" />
		{#if hasPreviousPage}
			<PageSwitcherPage number={currentPage - 1} overrideStyle="<" />
		{/if}
	</div>
	<div class="centerers">
		{#each pages as page}
			<PageSwitcherPage number={page} current={page == currentPage} />
		{/each}
	</div>
	<div class="righters">
		{#if hasNextPage}
			<PageSwitcherPage number={+currentPage + 1} overrideStyle=">" />
		{/if}
		<PageSwitcherPage number={maximumPage} overrideStyle=">>" />
	</div>
</main>
