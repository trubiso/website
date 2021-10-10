<script lang="ts">
	import {theme} from '../store';	
	import { get } from 'svelte/store';
	import Sidebar from '$lib/sidebar.svelte';
	const sidebar_size = 200;
</script>

<svelte:head>
	<meta content="trubiso" property="og:title" />
    <meta content="come have fun" property="og:description" />
    <meta content="http://trubiso.tk" property="og:url" />
    <meta content="http://trubiso.tk/favicon.png" property="og:image" />
    <meta content="#ffc600" data-react-helmet="true" name="theme-color" />
</svelte:head>

<main>
	<Sidebar size={sidebar_size} theme_change_func={()=>{ 
		theme.set(1 - (get(theme) ?? 1));
	}} />
	<div class="content" style="margin-left: {sidebar_size}px">
		<slot/>
	</div>
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow: hidden;
		margin-top: 0;
		max-width: 1024px;
		margin: 0 auto;
		margin-top: -1.278vh;
		box-sizing: border-box;
	}
	.content {
		flex-grow: 1;
		padding: 30px;
	}
</style>
