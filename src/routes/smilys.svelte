<script lang="ts">
	import {
		lang,
		getTextCollection,
		emoteLinks,
		emoteNames,
		IEmote
	} from '$lib/vars';

	const sortOptions = getTextCollection('smilies.sorts');
	const topText = getTextCollection('smilies.top_text');
	const lucky2883 = getTextCollection('smilies.lucky_2883');
	const names = getTextCollection('sidebar.item_names');

	const emotes: IEmote[] = [];
	for (let i = 0; i < emoteLinks.length; i++)
		emotes.push({ name: emoteNames[i], url: emoteLinks[i] });
	let vEmotes: IEmote[] = emotes.map((v) => v);
	let currentSort = 2;
	const sortChange = () => {
		const s = document.getElementById('sort') as HTMLSelectElement;
		currentSort = sortOptions[$lang].indexOf(s.value) ?? 0;
		resortArray();
	};
	const resortArray = () => {
		switch (currentSort) {
			case 0:
				vEmotes.sort((a, b) =>
					a.name.toLowerCase() < b.name.toLowerCase()
						? -1
						: a.name.toLowerCase() > b.name.toLowerCase()
						? 1
						: 0
				);
				vEmotes = vEmotes;
				break;
			case 1:
				vEmotes.sort((a, b) =>
					a.name.toLowerCase() < b.name.toLowerCase()
						? 1
						: a.name.toLowerCase() > b.name.toLowerCase()
						? -1
						: 0
				);
				vEmotes = vEmotes;
				break;
			case 2:
				vEmotes = emotes.map((v) => v);
				vEmotes = vEmotes;
				break;
			case 3:
				vEmotes = emotes.map((v) => v);
				vEmotes.reverse();
				break;
			case 4:
				vEmotes.sort(() => 0.5 - Math.random());
				vEmotes = vEmotes;
				break;
		}
	};
</script>

<svelte:head>
	<title>{names[$lang][1]}</title>
</svelte:head>

<main class="smilys">
	<h1>{names[$lang][1]}</h1>
	{topText[$lang][0]}<a href="https://discord.gg/JY7PapMSFR" target="_blank">{topText[$lang][1]}</a>)
	<br /><span>{topText[$lang][2]}</span>
	<select name="sort" id="sort" on:change={sortChange}>
		{#each sortOptions[$lang] as opt}
			<option value={opt} selected={sortOptions[$lang].findIndex((v) => v === opt) === 2}>{opt}</option
			>
		{/each}
	</select>
	{#each vEmotes as emote}
		<div>
			<h2>{emote.name}</h2>
			<img src={emote.url} alt="" />
			{#if vEmotes.findIndex((v) => v === emote) === 20}
				<span class="lucky">{lucky2883[$lang]}</span>
			{/if}
		</div>
	{/each}
</main>

<style lang="scss">
	main.smilys {
		@media (max-width: 600px) {
			text-align: center;
		}

		span.lucky {
			cursor: default;
			color: var(--mb);
			position: absolute;
		}
	}
</style>