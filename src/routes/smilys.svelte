<script lang="ts">
import { theme, lang, SidebarThemes, getTextCollection, EmotiguyEmoteLinks, EmotiguyEmoteNames, IEmote } from "$lib/vars";

    let cl = 0, ct = 0;
    lang .subscribe(v => { cl = v; });
    theme.subscribe(v => { ct = v; });

    const sortOptions = getTextCollection("smilies.sorts");
    const topText = getTextCollection("smilies.top_text");
    const lucky2883 = getTextCollection("smilies.lucky_2883");

    const emotes: IEmote[] = [];
    for (let i = 0 ; i < EmotiguyEmoteLinks.length ; i ++) {
        emotes.push({name: EmotiguyEmoteNames[i], url: EmotiguyEmoteLinks[i]});
    }
    let vEmotes : IEmote[] = emotes.map(v=>v);
    let currentSort = 2;
    const sortChange = v=>{
		const s = document.getElementById("sort") as HTMLSelectElement;
		currentSort = sortOptions[cl].indexOf(s.value) ?? 0;
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
    {topText[cl][0]}<a href="https://discord.gg/JY7PapMSFR" target="_blank">{topText[cl][1]}</a>)
    <br><span>{topText[cl][2]}</span>
    <select name="sort" id="sort" on:change="{sortChange}">
        {#each sortOptions[cl] as opt}
            <option value="{opt}" selected={sortOptions[cl].findIndex(v=>v===opt) === 2}>{opt}</option>
        {/each}
    </select>
    {#each vEmotes as emote}
        <div>
            <h1>{emote.name}</h1>
            <img src="{emote.url}" alt=""/>
            {#if vEmotes.findIndex(v=>v===emote) === 20}
                <span style="cursor:default;color:{SidebarThemes[ct].mb}">{lucky2883[cl]}</span>
            {/if}
        </div>
    {/each}
</section>