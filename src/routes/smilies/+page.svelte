<script>
	import { emotes } from '$lib/json';
	import { t } from '$lib/localization';
	import './style.scss';

	const originalEmotes = [...emotes.emoteNames];
	let sortedEmotes = originalEmotes;
</script>

<main class="smilies">
	<h1>{$t('navbar.smilies')}</h1>
	{$t('smilies.welcome')}
	<div class="emote-grid">
		{#each sortedEmotes as emote, i}
			<div class="emote-grid-emote">
				<h2>{emote}</h2>
				<div class="image-container">
					<img src={emotes.emoteLinks[i]} alt=":{emote}:" />
				</div>
				{#if i === 20}
					<span class="lucky">{$t('smilies.lucky')}</span>
				{/if}
			</div>
		{/each}
	</div>
</main>

<!-- <script lang="ts">
	// import { Sorts, emotes, getTextCollection, getTitleOfPage, sortArray } from '$lib/functions';
	import { lang } from '$lib/stores';

	const sortOptions = getTextCollection('smilies.sorts');
	const sorts: Sorts[] = ['a-z', 'z-a', 'none', 'reverse', 'random'];
	const texts = getTextCollection('smilies.texts');

	const originalEmotes = Array.from(emotes.keys());
	let sortedEmotes = originalEmotes;
	let currentSort = sortOptions[$lang][2];

	const resortArray = () => {
		const sortIndex: number = sortOptions[$lang].findIndex((v) => v === currentSort);
		sortedEmotes = sortArray(originalEmotes, sorts[sortIndex]);
	};
</script>

<main class="smilys">
	<h1>{getTitleOfPage('smilies', $lang)}</h1>
	{texts[$lang][0]} <a href="https://discord.gg/JY7PapMSFR" target="_blank">{texts[$lang][1]}</a>)
	<br /><span>{texts[$lang][2]}</span>
	<select name="sort" id="sort" bind:value={currentSort} on:change={resortArray}>
		{#each sortOptions[$lang] as opt}
			<option value={opt}>{opt}</option>
		{/each}
	</select>
	{#each sortedEmotes as emote, i}
		<div>
			<h2>{emote}</h2>
			<img src={emotes.get(emote)} alt="" />
			{#if i === 20}
				<span class="lucky">{texts[$lang][texts[$lang].length - 1]}</span>
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
			color: var(--bg);
			position: absolute;
		}
	}
</style> -->
