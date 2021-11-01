<script lang="ts">
import { EmotiguyEmoteLinks, EmotiguyEmoteNames, IEmote } from "$lib/vars";
    const emotes: IEmote[] = [];
    for (let i = 0 ; i < EmotiguyEmoteLinks.length ; i ++) {
        emotes.push({name: EmotiguyEmoteNames[i], url: EmotiguyEmoteLinks[i]});
    }
    let vEmotes : IEmote[] = emotes.map(v=>v);
    const sortOptions = [
        "Alphabetical (A-Z)",
        "Alphabetical (Z-A)",
        "Creation Date (Old-New)",
        "Creation Date (New-Old)",
        "Random"
    ]
    let currentSort = 2;
    const sortChange = v=>{
		const s = document.getElementById("sort") as HTMLSelectElement;
		currentSort = sortOptions.indexOf(s.value) ?? 0;
        resortArray();
	}
    const resortArray = ()=>{
        switch(currentSort) {
            case 0:
                vEmotes.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0));
                vEmotes = vEmotes;
                break;
            case 1:
                vEmotes.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : (a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 0));
                vEmotes = vEmotes;
                break;
            case 2:
                vEmotes = emotes.map(v=>v);
                vEmotes = vEmotes;
                break;
            case 3:
                vEmotes = emotes.map(v=>v);
                vEmotes.reverse();
                break;
            case 4:
                vEmotes.sort(() => .5 - Math.random());
                vEmotes = vEmotes;
                break;
        }
    }
</script>

<svelte:head>
	<title>smilys !!</title>
</svelte:head>

<section>
    heer ar my fren smilys !! (sourc: <a href="https://discord.gg/JY7PapMSFR" target="_blank">emtotiguy aprenecietion</a>)
    <br><span>sorte by:</span>
    <select name="sort" id="sort" on:change="{sortChange}">
        {#each sortOptions as opt}
            <option value="{opt}" selected={sortOptions.findIndex(v=>v===opt) === 2}>{opt}</option>
        {/each}
    </select>
    {#each vEmotes as emote}
        <div>
            <h1>{emote.name}</h1>
            <img src="{emote.url}" alt=""/>
            {#if vEmotes.findIndex(v=>v===emote) === 20}
                <span style="cursor:default;color:white;">Lucky you! You found a 2883 :)</span>
            {/if}
        </div>
    {/each}
</section>