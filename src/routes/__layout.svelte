<script lang="ts">
	import { get } from 'svelte/store';
	import Sidebar from '$lib/sidebar.svelte';
import { lang, SidebarThemes, theme } from '$lib/vars';
import { onMount } from 'svelte';
	const sidebar_size = 200;
	let ct = 0;
	onMount(()=>{
		lang.set(parseInt(window.localStorage.getItem("lang") ?? "0"));
		lang.subscribe(v => {
			window.localStorage.setItem("lang", v.toString());
		})
		theme.set(parseInt(window.localStorage.getItem("theme") ?? "0"));
		theme.subscribe(v => {
			window.localStorage.setItem("theme", v.toString());
			ct = v;
		})
	});
</script>

<svelte:head>
	<meta content="trubiso" property="og:title" />
    <meta content="come have fun" property="og:description" />
    <meta content="http://trubiso.tk" property="og:url" />
    <meta content="http://trubiso.tk/favicon.png" property="og:image" />
    <meta content="#ffc600" data-react-helmet="true" name="theme-color" />
</svelte:head>

<main style="background-color: {SidebarThemes[ct].mb}; color: {SidebarThemes[ct].mc}">
	<div class="everything">
		<Sidebar size={sidebar_size} />
		<div class="content" style="margin-left: {sidebar_size}px">
			<slot/>
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
	}
	.everything {
		position: flex;
		min-height: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow: hidden;
		overflow-y: scroll;
		margin-top: 0;
		max-width: 1024px;
		height: 100%;
	}
	.content {
		flex-grow: 1;
		padding: 30px;
	}
</style>
