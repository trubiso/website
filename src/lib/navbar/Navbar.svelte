<script lang="ts">
	import './Navbar.scss';
	import { navbar } from '$lib/json';
	import { lock, mobile, sidebarLocation, sidebarStyle } from '$lib/stores';
	import NavbarElement from './NavbarElement.svelte';
	import NavbarLogo from './NavbarLogo.svelte';
	import { slide } from 'svelte/transition';

	const items = navbar.order;

	let open = false;

	function toggleSidebar() {
		open = !open;
		lock.set(open);
	}
</script>

<main>
	<nav
		class="navbar"
		class:sidebar-a={!$sidebarLocation}
		class:sidebar-b={$sidebarLocation}
		class:alt-bg={$sidebarStyle === 1}
		class:rainbow-bg={$sidebarStyle === 2}
		class:rainbow-alt={$sidebarStyle === 3}
	>
		<div class="header-wrapper">
			{#if $mobile}
				<a class="navbar-toggle" href="#h" on:click|preventDefault={toggleSidebar} class:spin={open}
					>▼</a
				>
			{/if}
			<NavbarLogo />
		</div>

		{#if open || !$mobile}
			<div class="sidebar-wrapper" transition:slide>
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
