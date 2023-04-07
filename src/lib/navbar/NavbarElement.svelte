<script lang="ts">
	import './NavbarElement.scss';

	import { page } from '$app/stores';
	import { navbar } from '$lib/json';
	import { t } from '$lib/localization';
	import { lock, sidebarOpen, spiny } from '$lib/stores';

	export let name = 'home';
	export let mobile = false;
	export let popout = false;
	export let altPopout = false;
	export let sidebarLocation = 0;

	$: link = (navbar.links as Record<string, string>)[name]; // dumb TS fix that makes my code look ugly :'(
	// @ts-ignore
	$: label = $t(`navbar.${name}`);
</script>

<main>
	<a
		href={link}
		class="navbar-item"
		class:navbar-item-special={name === 'options'}
		class:bold={$page.url.pathname === link}
		class:popout={popout && !mobile}
		class:alt-popout={altPopout}
		class:mobile-popout={popout && mobile}
		class:sidebar-a={!sidebarLocation}
		class:sidebar-b={sidebarLocation}
		on:click={() => {
			sidebarOpen.set(false);
			lock.set(false);
		}}
		on:contextmenu|preventDefault={() => {
			if (name === 'options') spiny.set(true);
		}}
	>
		{label}
	</a>
</main>
