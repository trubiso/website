<script lang="ts">
    import { lang, getTextCollection } from "./vars";

    let cl = 0;
    lang .subscribe(v => { cl = v; });

    const langs = getTextCollection("langs");
    function switchLang(i: number) {
        lang.set(i);
    }
</script>

<div class="picker">
    <br>
    {#each langs as lang, i}
        <a href="#h" style="font-weight:{cl === i ? "bold" : "normal"}" on:click|preventDefault="{()=>switchLang(i)}">{lang}</a><br><br>
    {/each}
</div>

<style>
    .picker {
        margin: 0 auto;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .picker a {
        text-decoration: none;
        color: white;
        font-size: 12pt;
    }
</style>