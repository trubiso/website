<script lang="ts">
    export let size;
    let theme = 0;
import { onMount } from 'svelte';
    type SidebarItem = {
        name: string,
        link: string
    };
    type SidebarTheme = {
        bg1: string,
        bg2: string,
        tc: string
    };
    const items: SidebarItem[] = [
        {
            name: "hoem",
            link: "/"
        },
        {
            name: "smilys !!",
            link: "/smilys"
        },
        {
            name: "don't cliq",
            link: "/bad"
        },
        {
            name: "kity",
            link: "/kity"
        },
        {
            name: "socials",
            link: "/socials"
        }
    ];
    const themes: SidebarTheme[] = [
        {
            bg1: "#9292c1",
            bg2: "#7070a0",
            tc: "#181818"
        },
        {
            bg1: "#32324f",
            bg2: "#10102d",
            tc: "#e6bb1c"
        },
        {
            bg1: "#990099",
            bg2: "#660066",
            tc: "#ff00ff"
        }
    ]
    const getTheme = () => {
        let t : SidebarTheme;
        if (!theme) t = themes[0];
        else t = themes[theme ?? 0];
        return `--bg1: ${t.bg1}; --bg2: ${t.bg2}; --c: ${t.tc}`;
    }
    let ctr = 0;
    const clickLogo = () => {
        ctr++;
        if (ctr >= 10) {
            document.getElementById("logo").setAttribute("src", "https://cdn.discordapp.com/emojis/729411456491323412.png")
        }
    }
    const updateSidebar = () => {
        setTimeout( () => {
        [...Array(items.length).keys()].forEach(v=>{
            const d = document.getElementById(`sitem-${v}`);
            if (!d) return;
            if (items[v].link === location.pathname) {
                d.classList.add("sidebar-b");
            } else {
                d.classList.remove("sidebar-b");
            }
        })}, 100 );
    }
    const updateTheme = () => {
        if (document.getElementsByClassName("sidebar")) {
            document.getElementsByClassName("sidebar")[0].setAttribute("style", `width: ${size}px; ${getTheme()}`)
        }
    }

    const switchTheme = (secret: boolean = false) => {
        if (theme === 2) theme = 1;
        else if (secret) theme = 2;
        else theme = 1-theme;
        window.localStorage.setItem("theme", theme.toString());
    }

    onMount(()=>{
        theme = parseInt(window.localStorage.getItem("theme") ?? "0");
        updateSidebar();
        updateTheme();
    });
</script>

<div class="sidebar" style="width: {size}px; {getTheme()}">
    <img src="/logo.png" alt="logo" id="logo" on:click="{clickLogo}" />
    {#each items as item}
        <a href={item.link} id="sitem-{items.findIndex(v=>v===item)}" on:click="{updateSidebar}">{item.name}</a>
    {/each}
    <div class="sidebar-foot"> 
        <span class="btn" on:contextmenu|preventDefault="{()=>{switchTheme(true); updateTheme();}}" on:click|preventDefault={()=>{switchTheme(); updateTheme();}}>switch theme</span>
    </div>
    <span class="sidebar-b"></span>
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
        padding-top: 20px;
        text-align: center;
    }

    .sidebar-b {
        font-weight: bold;
        font-size: 22;
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