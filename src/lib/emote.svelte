<script lang="ts">
import { EmotiguyEmoteLinks, EmotiguyEmoteNames } from "./vars";
    export let name : string = "happy";
    export let size : string = "22";
    const link = EmotiguyEmoteLinks[EmotiguyEmoteNames.findIndex(e => e === name)]

</script>

<div class="emote">
    <img src="{link}" alt="{name}" width="{size}" height="{size}" />
</div>

<style>
    .emote {
        display: inline;
    }
    .emote img {
        vertical-align: middle;
        line-height: normal;
    }
</style>