<script lang="ts">
	export let size;
	import { onMount } from 'svelte';
	import {
		theme,
		lang,
		getTextCollection,
		SidebarItems,
		SidebarThemes,
		EmotiguyEmoteLinks,
		EmotiguyEmoteNames
	} from '$lib/vars';

	import { slide } from 'svelte/transition';
	import Themepicker from './themepicker.svelte';
	import Langpicker from './langpicker.svelte';

	let cl = 0,
		ct = 0;
	let loaded = false;

	const updateSidebar = (item?: string) => {
		[...Array(SidebarItems.length).keys()].forEach((v) => {
			const d = document.getElementById(`sitem-${v}`);
			if (!d) return;

			if ((!item && SidebarItems[v] === location.pathname) || (item && SidebarItems[v] === item))
				d.classList.add('sidebar-b');
			else d.classList.remove('sidebar-b');
		});
	};

	lang.subscribe((value) => {
		cl = value;
	});
	theme.subscribe((value) => {
		ct = value;
		if (loaded) updateTheme();
	});

	const SidebarItemNames = getTextCollection('sidebar.item_names');
	const emoteLinks = EmotiguyEmoteLinks;
	const emoteNames = EmotiguyEmoteNames;

	const getTheme = () => {
		const t = SidebarThemes[ct];

		return `--bg1: ${t.bg1}; --bg2: ${t.bg2}; --c: ${t.tc}`;
	};

	let ctr = 0;
	const clickLogo = () => {
		ctr++;
		if (ctr >= 10)
			document
				.getElementById('logo')
				.setAttribute('src', emoteLinks[emoteNames.findIndex((v) => v === 'silly')]);
	};

	const updateTheme = () => {
		if (document.getElementsByClassName('sidebar'))
			document
				.getElementsByClassName('sidebar')[0]
				.setAttribute('style', `width: ${size}px; ${getTheme()}`);
	};

	onMount(() => {
		loaded = true;
		updateSidebar();
		updateTheme();
	});

	let toggleTP = false,
		toggleLP = false;

	function toggleTLP(tp = false) {
		if (tp) {
			toggleTP = !toggleTP;
			if (toggleLP) toggleLP = false;
		} else {
			toggleLP = !toggleLP;
			if (toggleTP) toggleTP = false;
		}
	}
</script>

<div class="sidebar" style="width: {size}px; {getTheme()}">
	<img src="/logo.png" alt="logo" id="logo" on:click={clickLogo} />
	{#each SidebarItems as item, i}
		<a href={item} id="sitem-{i}" on:click={() => updateSidebar(item)}>{SidebarItemNames[cl][i]}</a>
	{/each}
	<div class="sidebar-foot">
		<span
			class="btn"
			style="font-weight:{toggleTP ? 'bold' : 'normal'}"
			on:click|preventDefault={() => toggleTLP(true)}
			>{SidebarItemNames[cl][SidebarItemNames[cl].length - 2]}
		</span>
		{#if toggleTP}
			<div id="tp" transition:slide><Themepicker /></div>
		{/if}

		<span
			class="btn"
			style="font-weight:{toggleLP ? 'bold' : 'normal'}"
			on:click|preventDefault={() => toggleTLP()}
		>
			{SidebarItemNames[cl][SidebarItemNames[cl].length - 1]}
		</span>
		{#if toggleLP}
			<div id="lp" transition:slide><Langpicker /></div>
		{/if}
	</div>
	<span class="sidebar-b"><!--this span is useless--></span>
	<span class="sidebar-s">trubiso.tk/awesome</span>
</div>

<style>
	.sidebar {
		height: 100%;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		background: linear-gradient(to bottom, var(--bg1), var(--bg2));
		overflow-x: hidden;
		overflow-y: hidden;
		padding-top: 20px;
		text-align: center;
	}

	.sidebar-b {
		font-weight: bold;
	}

	.sidebar-s {
		position: relative;
		top: 13290vh;
	}

	.sidebar img {
		text-align: center;
		padding: 13px;
	}

	.sidebar a,
	.sidebar .btn {
		padding: 6px 8px 6px 8px;
		text-decoration: none;
		font-size: 25px;
		color: var(--c);
		display: block;
		text-align: center;
	}

	.sidebar-foot {
		position: relative;
		overflow: hidden;
		text-align: center;
	}

	.sidebar .btn {
		color: #fff;
		background-color: transparent;
		outline: 0;
		border-style: none;
		outline-style: none;
		cursor: pointer;
		user-select: none;
	}

    @media 
</style>
