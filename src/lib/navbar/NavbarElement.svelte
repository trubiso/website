<script lang="ts">
	import './NavbarElement.scss';

	import { page } from '$app/stores';
	import { navbar } from '$lib/json';
	import { t } from '$lib/localization';
	import { spiny } from '$lib/stores';

	export let name = 'home';
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
		class:popout
		class:alt-popout={altPopout}
		class:sidebar-a={!sidebarLocation}
		class:sidebar-b={sidebarLocation}
		on:contextmenu|preventDefault={() => {
			if (name === 'options') spiny.set(true);
		}}
	>
		{label}
	</a>
</main>
