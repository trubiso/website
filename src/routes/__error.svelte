<script context="module">
    export function load({error, status}) {
        return {
            props: {
                title: `${status}`
            }
        }
    }
</script>

<script>
import Emote from "$lib/emote.svelte";

    export let title;
</script>

<h1>ERRORE {title} !!! <Emote name="shock" size="44"/></h1>
{#if title === "404"}
    OH NOE ! YU GO TO RONG PAEG !! <Emote name="allifeelispain" /><br>
    its onke thuogh.. <Emote name="happy" /><br>
    yu see da siedbar ?!?!? YESE ?!?!? <Emote name="shock_handless" /><br>
    yu can finde moar pages ther <Emote name="glad" /><br><br>
    ALTHUOGUHGOHEGHEH !! it mite be my (trumbinso) fualt !! <Emote name="sad" /><Emote name="sad2" /><Emote name="sad" /><br>
    in dat caes yu can contaqt me and i wil FIX !! <Emote name="excited" /><Emote name="excited_jumping" />
{:else}
    waht da frinq did yu dOe !! <Emote name="think" />
{/if}