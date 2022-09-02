<script lang="ts">
	import './Navbar.scss';
	import { navbar } from '$lib/json';
	import { mobile, sidebarLocation, sidebarStyle } from '$lib/stores';
	import NavbarElement from './NavbarElement.svelte';
	import NavbarLogo from './NavbarLogo.svelte';

	const items = navbar.order;

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
			<NavbarLogo />
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
