<script lang="ts">
	import { localizeTag } from '$lib/bug';
	import './BugTag.scss';

	export let tagName: string;
	export let noLink = false;

	$: tag = $localizeTag(tagName);
</script>

<main class="bug-tag">
	{#if noLink}
		{tag}
	{:else}
		<a href="?tag={tagName}">{tag}</a>
	{/if}
	<slot />
</main>
