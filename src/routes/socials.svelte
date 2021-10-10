<script lang="ts">
    type SM = {
            name: string,
        username: string,
           link?: string
    };
    const smc : SM[] = [
        {
            name: "github",
            username: "trubiso",
            link: "https://www.github.com/trubiso"
        },
        {
            name: "twitch",
            username: "trubiso",
            link: "https://www.twitch.tv/trubiso"
        },
        {
            name: "discord",
            username: "@Trubiso#5265"
        }
    ]
</script>

<svelte:head>
    <title>socials</title>
</svelte:head>

<section>
    <h1>here's my stuff</h1>
    <ul>
        {#each smc as s}
            <li>{s.name}: {#if s.link}
                <a href="{s.link}" target="_blank">{s.username}</a>
            {:else}
                <span>{s.username}</span>
            {/if}</li>
        {/each}
    </ul>
</section>