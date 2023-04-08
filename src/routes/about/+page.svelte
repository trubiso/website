<script lang="ts">
	import { order, socialMedia } from '$lib/json';
	import { t } from '$lib/localization';
	import EmoteZone from '$lib/text/EmoteZone.svelte';
	import './style.scss';
</script>

<main class="about">
	<EmoteZone>
		<h1>{$t('about.thanks')}</h1>
		<p><b>{$t('about.privacyPre')}</b> {$t('about.privacy')} :skype_bandit:</p>
		<p><b>{$t('about.collaborationPre')}</b> {$t('about.collaboration')} :tongue_left:</p>
		<p><b>{$t('about.specialThanksPre')}</b> {$t('about.specialThanks')} :flush_happy:</p>
		<p>
			{$t('about.repository')}
			<a href="https://github.com/trubiso/website">{$t('socialMedia.github')}</a>
		</p>
		<p>:shock: {$t('about.socialMedia')}</p>
		<ul>
			{#each order.socialMedia as media}
				<li>
					{$t(`socialMedia.${media}`)}: {#if socialMedia.links[media]}
						<a href={socialMedia.values[media]}>{socialMedia.values[media]}</a>
					{:else}
						{socialMedia.values[media]}
					{/if}
				</li>
			{/each}
		</ul>
		<p>{$t('about.signoff')} :pet:</p>
	</EmoteZone>
</main>
