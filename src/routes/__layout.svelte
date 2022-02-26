<script lang="ts">
	import Sidebar from '$lib/sidebar.svelte';
	import { lang, SidebarThemes, theme } from '$lib/vars';
	import { onMount } from 'svelte';
	const sidebarSize = 200;
	let ct = 0;
	onMount(() => {
		lang.set(parseInt(window.localStorage.getItem('lang') ?? '0'));
		lang.subscribe((v) => {
			window.localStorage.setItem('lang', v.toString());
		});
		theme.set(parseInt(window.localStorage.getItem('theme') ?? '0'));
		theme.subscribe((v) => {
			window.localStorage.setItem('theme', v.toString());
			ct = v;
		});
	});
</script>

<svelte:head>
	<meta content="trubiso" property="og:title" />
	<meta content="come have fun" property="og:description" />
	<meta content="http://trubiso.tk" property="og:url" />
	<meta content="http://trubiso.tk/favicon.png" property="og:image" />
	<meta content="#ffc600" data-react-helmet="true" name="theme-color" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<main style="background-color: {SidebarThemes[ct].mb}; color: {SidebarThemes[ct].mc}">
	<div class="everything">
		<Sidebar size={sidebarSize} />
		<div class="content" style="--ss: {sidebarSize}px">
			<slot />
		</div>
	</div>
</main>

<style>
	main {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		height: 100%;
		width: 100%;
		overflow-y: scroll;
		font-family: 'Times New Roman', Times, serif;
	}
	.everything {
		min-height: 100%;
		width: 100%;
		margin-top: 0;
		max-width: 1024px;
		height: 100%;
	}
	.content {
		padding: 30px;
		margin-left: 0;
		margin-top: calc(var(--ss) / 3);
	}

	@media only screen and (min-width: 600px) {
		.content {
			margin-left: var(--ss);
			margin-top: 0;
		}
	}
</style>
