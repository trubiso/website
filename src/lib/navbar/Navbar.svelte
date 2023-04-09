<script lang="ts">
	import { page } from '$app/stores';
	import { navbar } from '$lib/json';
	import LoginModal from '$lib/login/LoginModal.svelte';
	import {
		lock,
		mobile,
		sidebarLocation,
		sidebarOpen,
		sidebarPopout,
		sidebarStyle,
		theme
	} from '$lib/stores';
	import { slide } from 'svelte/transition';
	import './Navbar.scss';
	import NavbarAccount from './NavbarAccount.svelte';
	import NavbarElement from './NavbarElement.svelte';
	import NavbarLogo from './NavbarLogo.svelte';

	const items = navbar.order;

	$: altPopout = $theme.accent === $theme.bg;
	$: lastBold = $page.url.pathname === navbar.links.options;
	let isFormOpen = false;
	let isLoggedIn: boolean;
	let updateAccount: () => void;

	function toggleSidebar() {
		sidebarOpen.set(!$sidebarOpen);
		lock.set($sidebarOpen);
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
		class:last-bold={lastBold}
		class:open={$sidebarOpen}
	>
		<div class="sidebar-fill-top" />

		<div class="header-wrapper">
			{#if $mobile}
				<a
					class="navbar-toggle"
					href="#h"
					on:click|preventDefault={toggleSidebar}
					class:spin={$sidebarOpen}>▼</a
				>
			{/if}
			<NavbarLogo />
		</div>

		{#if $sidebarOpen || !$mobile}
			<div class="sidebar-wrapper" transition:slide>
				<div class="top">
					{#each items as item}
						<NavbarElement
							name={item}
							mobile={$mobile}
							popout={!!$sidebarPopout}
							{altPopout}
							sidebarLocation={$sidebarLocation}
						/>
					{/each}
				</div>

				<div class="sidebar-fill" />

				{#if isFormOpen}
					<LoginModal on:close={() => (isFormOpen = false)} on:login={updateAccount} />
				{/if}

				<div class="bottom">
					<NavbarElement
						name="log_in"
						mobile={$mobile}
						popout={!!$sidebarPopout}
						{altPopout}
						sidebarLocation={$sidebarLocation}
						forceSpecial
						onClick={(e) => {
							if (isLoggedIn) return;
							e.preventDefault();
							isFormOpen = true;
						}}
					>
						<NavbarAccount bind:update={updateAccount} bind:isLoggedIn />
					</NavbarElement>
				</div>
			</div>
		{/if}

		<div style="display: none;">trubiso.tk/awesome</div>
		<!--easter egg :silly:-->
	</nav>
</main>
