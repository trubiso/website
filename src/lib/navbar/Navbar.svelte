<script lang="ts">
	import { navbar } from '$lib/json';
	import { lock, mobile, sidebarLocation, sidebarPopout, sidebarStyle, theme } from '$lib/stores';
	import { slide } from 'svelte/transition';
	import './Navbar.scss';
	import NavbarElement from './NavbarElement.svelte';
	import NavbarLogo from './NavbarLogo.svelte';

	const items = navbar.order;

	let open = false;

	$: altPopout = $theme.accent === $theme.bg;

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
		class:popout={$sidebarPopout}
		class:alt-popout={altPopout}
	>
		<div class="sidebar-fill-top" />

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
					<NavbarElement
						name={item}
						popout={!!$sidebarPopout && !$mobile}
						{altPopout}
						sidebarLocation={$sidebarLocation}
					/>
				{/each}

				<!--TODO: navbar.log_in-->
			</div>
		{/if}

		<div class="sidebar-fill" />

		<div style="display: none;">trubiso.tk/awesome</div>
		<!--easter egg :silly:-->
	</nav>
</main>
