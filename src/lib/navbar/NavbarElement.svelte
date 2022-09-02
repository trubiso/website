<script lang="ts">
	import './NavbarElement.scss';

	import { navbar } from '$lib/json';
	import { t } from '$lib/localization';
	import { page } from '$app/stores';
	import { spiny } from '$lib/stores';

	export let name = 'home';

	$: link = (navbar.links as Record<string, string>)[name]; // dumb TS fix that makes my code look ugly :'(
	$: label = t(`navbar.${name}`);
</script>

<main>
	<a
		href={link}
		class="navbar-item"
		class:navbar-item-special={name === 'options'}
		class:bold={$page.url.pathname === link}
		on:contextmenu|preventDefault={() => {
			if (name === 'options') spiny.set(true);
		}}
	>
		{label}
	</a>
</main>
