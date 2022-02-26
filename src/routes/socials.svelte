<script lang="ts">
	import { SocialMediaCollection } from '$lib/vars';
</script>

<svelte:head>
	<title>socials</title>
</svelte:head>

<section>
	<h1>here's my stuff</h1>
	<ul>
		{#each SocialMediaCollection as s}
			<li>
				{s.name}: {#if s.link}
					<a href={s.link} target="_blank">{s.username}</a>
				{:else}
					<span>{s.username}</span>
				{/if}
			</li>
		{/each}
	</ul>
</section>
