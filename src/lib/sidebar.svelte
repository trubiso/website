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

	let current = 0;

	const updateSidebar = (item?: string) => {
		[...Array(SidebarItems.length).keys()].forEach((v) => {
			const d = document.getElementById(`sitem-${v}`);
			if (!d) return;

			if ((!item && SidebarItems[v] === location.pathname) || (item && SidebarItems[v] === item)) {
				current = v;
				d.classList.add('sidebar-b');
			} else d.classList.remove('sidebar-b');
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

		return `--size: ${size}px; --bg1: ${t.bg1}; --bg2: ${t.bg2}; --c: ${t.tc}`;
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
			document.getElementsByClassName('sidebar')[0].setAttribute('style', `${getTheme()}`);
	};

    let matches = true;

	onMount(() => {
		loaded = true;
		updateSidebar();
		updateTheme();
        const query = window.matchMedia('(min-width: 600px)');
        const queryListener = v => matches = v.matches;
        query.addListener(queryListener);
        matches = query.matches;
	});

	let toggleTP = false,
		toggleLP = false,
        tsm = false;

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

<div class="sidebar" style={getTheme()}>
	<img src="/logo.png" alt="logo" id="logo" on:click={clickLogo} />
    <div class="name sidebar-b">{SidebarItemNames[cl][current].replaceAll(' ', '\u00a0')}</div>
	<span class="btn triangle" on:click|preventDefault={() => {tsm = !tsm; setTimeout(updateSidebar, 20); if(!tsm) toggleTP = toggleLP = false;}}>V</span>
    {#if matches || tsm}
	<div class="items" transition:slide>
		{#each SidebarItems as item, i}
			<a href={item} id="sitem-{i}" on:click={() => updateSidebar(item)}
				>{SidebarItemNames[cl][i]}</a
			>
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
	</div>
    {/if}
	<span class="sidebar-b"><!--this span is useless--></span>
	<span class="sidebar-s">trubiso.tk/awesome</span>
</div>

<style>
	.sidebar {
		position: fixed;
		height: calc(var(--size) / 3);
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
		text-align: left;
		vertical-align: middle;
		line-height: normal;
		background: linear-gradient(to bottom, var(--bg1), var(--bg2));
		top: 0;
		left: 0;
		z-index: 1;
	}

    .items {
        position: fixed;
        top: calc(var(--size) / 3);
        right: 0;
        background-color: var(--bg2);
        width: 100%;
    }

	.sidebar-s {
		display: none;
	}

	.sidebar-b {
		font-weight: bold;
	}

	.sidebar img {
		text-align: center;
		padding: 13px;
	}
	.sidebar-foot {
		position: relative;
		overflow: hidden;
		text-align: center;
	}

	.sidebar a,
	.sidebar .btn {
		padding: 8px 10px 8px 10px;
		text-decoration: none;
		font-size: 25px;
		color: var(--c);
		display: block;
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

	.sidebar .triangle {
		position: fixed;
		padding: 0;
		margin-top: calc(var(--size) / 3 / 2);
		vertical-align: middle;
		margin-right: 40px;
		line-height: 0;
		top: 0;
		right: 0;
	}

    .sidebar .name {
        opacity: 0%;
    }

    @media only screen and (min-width: 300px) {
        .items {
            width: 50%;
        }
    }

    @media only screen and (min-width: 375px) {
		.sidebar .name {
            opacity: 100%;
            position: fixed;
            padding: 0;
            margin-top: calc(var(--size) / 3 / 2);
            vertical-align: middle;
            line-height: 0;
            top: 0;
            left: 50%;
            right: 50%;
            text-align: center;
            font-size: calc(var(--size) / 6);
            color: var(--c);
        }

        .items {
            width: 40%;
        }
	}

	@media only screen and (min-width: 600px) {
		.sidebar {
			width: var(--size);
			height: 100%;
			padding-top: 20px;
			text-align: center;
		}

		.sidebar-s {
			position: relative;
			top: 13290vh;
		}

        .sidebar a, .sidebar .btn {
            padding: 6px 8px 6px 8px;
        }

		.sidebar .triangle, .sidebar .name {
			display: none;
		}

        .items {
            display: block;
            position: relative;
            background-color: rgba(0,0,0,0);
            top: 0;
            width: auto;
        }
	}
</style>
