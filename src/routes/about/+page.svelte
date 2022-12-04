<script lang="ts">
	import { order, socialMedia } from '$lib/json';
	import { t } from '$lib/localization';
</script>

<main class="about">
	<h1>{t('about.thanks')}</h1>
	<p><b>{t('about.privacyPre')}</b> {t('about.privacy')}</p>
	<p><b>{t('about.collaborationPre')}</b> {t('about.collaboration')}</p>
	<p><b>{t('about.specialThanksPre')}</b> {t('about.specialThanks')}</p>
	<p>
		<b>{t('about.repository')}</b>
		<a href="https://github.com/trubiso/website">{t('socialMedia.github')}</a>
	</p>
	<p><b>{t('about.socialMedia')}</b></p>
	<ul>
		{#each order.socialMedia as media}
			<li>
				{t(`socialMedia.${media}`)}: {#if socialMedia.links[media]}
					<a href={socialMedia.values[media]}>{socialMedia.values[media]}</a>
				{:else}
					{socialMedia.values[media]}
				{/if}
			</li>
		{/each}
	</ul>
	<p><b>{t('about.signoff')}</b></p>
</main>
