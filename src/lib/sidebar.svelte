<script lang="ts">
    export let size;
    export let theme_change_func;
    import {theme} from '../store';	
    import { get } from 'svelte/store';
    type SidebarItem = {
        name: string,
        link: string
    };
    type SidebarTheme = {
        bg: string,
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
        }
    ];
    const themes: SidebarTheme[] = [
        {
            bg: "#889",
            tc: "#181818"
        },
        {
            bg: "#223",
            tc: "#818181"
        }
    ]
    const getTheme = () => {
        let t : SidebarTheme;
        if (!get(theme)) t = themes[0];
        else t = themes[get(theme) ?? 0];
        return `--bg: ${t.bg}; --c: ${t.tc}`;
    }
</script>

<div class="sidebar" style="width: {size}px; {getTheme()}">
    {#each items as item}
        <a href={item.link}>{item.name}</a>
    {/each}
    <div class="sidebar-foot">
        <button on:click|preventDefault={v => {
            theme_change_func();
            if (document.getElementsByClassName("sidebar")) {
                document.getElementsByClassName("sidebar")[0].setAttribute("style", `width: ${size}px; ${getTheme()}`)
            }
        }}>Switch Theme</button>
    </div>
</div>

<style>
    .sidebar {        
        height: 100%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: var(--bg);
        overflow-x: hidden;
        padding-top: 20px;
    }

    .sidebar a {
        padding: 6px 8px 6px 8px;
        text-decoration: none;
        font-size: 25px;
        color: var(--c);
        display: block;
        text-align: center;
    }

    .sidebar-foot {
        position: absolute;
        bottom:2vw;
    }
    
    .sidebar button {
        margin-left: 5vh;
        padding: 10px;
        color: #fff;
        background-color: transparent;
        outline:0;
        border-style: none;
        outline-style: none;
    }
</style>