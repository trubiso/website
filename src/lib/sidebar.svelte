<script lang="ts">
    export let size;
import { onMount } from 'svelte';
import { theme, lang, getTextCollection, SidebarItems, SidebarThemes, SidebarTheme, SidebarSTI } from "$lib/vars";
import { get } from 'svelte/store';
    let cl = 0, ct = 0;
    let vv = false;

    const updateSidebar = () => {
        setTimeout( () => {
        [...Array(SidebarItems.length).keys()].forEach(v=>{
            const d = document.getElementById(`sitem-${v}`);
            if (!d) return;
            if (SidebarItems[v] === location.pathname) {
                d.classList.add("sidebar-b");
            } else {
                d.classList.remove("sidebar-b");
            }
        })}, 100 );
    }

	lang.subscribe(value => { cl = value; });
    theme.subscribe(value => { ct = value; if (vv) updateSidebar(); });

    const SidebarItemNames = getTextCollection("sidebar.item_names");

    const getTheme = () => {
        let t = SidebarThemes[ct];
        return `--bg1: ${t.bg1}; --bg2: ${t.bg2}; --c: ${t.tc}`;
    }
    let ctr = 0;
    const clickLogo = () => {
        ctr++;
        if (ctr >= 10) {
            document.getElementById("logo").setAttribute("src", "https://cdn.discordapp.com/emojis/729411456491323412.png")
        }
    }
    const updateTheme = () => {
        if (document.getElementsByClassName("sidebar")) {
            document.getElementsByClassName("sidebar")[0].setAttribute("style", `width: ${size}px; ${getTheme()}`)
        }
    }

    const switchTheme = (secret: boolean = false) => {
        if (ct === 2) theme.set(1);
        else if (secret) theme.set(2);
        else theme.set(1-ct);
    }

    onMount(()=>{
        vv = true;
        ct = parseInt(window.localStorage.getItem("theme") ?? "0");
        updateSidebar();
        updateTheme();
    });
</script>

<div class="sidebar" style="width: {size}px; {getTheme()}">
    <img src="/logo.png" alt="logo" id="logo" on:click="{clickLogo}" />
    {#each SidebarItems as item}
        <a href={item} id="sitem-{SidebarItems.findIndex(v=>v===item)}" on:click="{updateSidebar}">{SidebarItemNames[cl][SidebarItems.findIndex(v=>v===item)]}</a>
    {/each}
    <div class="sidebar-foot"> 
        <span class="btn" on:contextmenu|preventDefault="{()=>{switchTheme(true); updateTheme();}}" on:click|preventDefault={()=>{switchTheme(); updateTheme();}}>{SidebarItemNames[cl][SidebarSTI]}</span>
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
        font-size: 22;
    }

    .sidebar-s {
        position: relative;
        top: 13290vh;
    }

    .sidebar img {
        text-align: center;
        padding: 13px;
    }

    .sidebar a, .sidebar .btn {
        padding: 6px 8px 6px 8px;
        text-decoration: none;
        font-size: 25px;
        color: var(--c);
        display: block;
        text-align: center;
    }

    .sidebar-foot {
        position:relative;
        overflow: hidden;
        text-align: center;
    }
    
    .sidebar .btn {
        color: #fff;
        background-color: transparent;
        outline:0;
        border-style: none;
        outline-style: none;
        cursor:pointer;
        user-select: none;
    }
</style>