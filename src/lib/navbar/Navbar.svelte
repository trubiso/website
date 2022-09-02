<script lang="ts">
	import './Navbar.scss';
	import { navbar } from '$lib/json';
	import { mobile, sidebarLocation, sidebarStyle } from '$lib/stores';
	import NavbarElement from './NavbarElement.svelte';

	const items = navbar.order;

	let clicks = 0; // easter egg

	let open = false;

	function toggleSidebar() {
		open = !open;
	}
</script>

<main>
	<nav
		class="navbar"
		class:sidebar-top={!$sidebarLocation && $mobile}
		class:sidebar-left={!$sidebarLocation && !$mobile}
		class:sidebar-right={$sidebarLocation && !$mobile}
		class:sidebar-bottom={$sidebarLocation && $mobile}
		class:alt-bg={$sidebarStyle}
	>
		<div class="header-wrapper">
			{#if $mobile}
				<div class="navbar-toggle" on:click={toggleSidebar}>▼</div>
			{/if}
			<div class="logo">
				{#if clicks < 10}
					<img src="/logo.png" alt="logo" on:click={() => clicks++} />
				{:else}
					<img src="/logo.png" alt=":silly:" on:click={() => clicks++} />
					<!--TODO: finish logo (emotes map)-->
				{/if}
			</div>
		</div>

		{#if open || !$mobile}
			<div class="sidebar-wrapper">
				{#each items as item}
					<NavbarElement name={item} />
				{/each}

				<!--TODO: navbar.log_in-->
			</div>
		{/if}

		<div style="display: none;">trubiso.tk/awesome</div>
		<!--easter egg :silly:-->
	</nav>
</main>
