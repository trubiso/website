<script lang="ts">
	import { localizeTag } from '$lib/bug';
	import './BugTag.scss';

	export let tagName: string;
	export let noLink = false;

	$: tag = $localizeTag(tagName);
</script>

<main class="bug-tag">
	<div class="tag">
		{#if noLink}
			<span>{tag}</span>
		{:else}
			<a href="?tag={tagName}">{tag}</a>
		{/if}
	</div>
	<div class="foreign">
		<slot />
	</div>
</main>
