<script lang="ts">
	import { localizeTag } from '$lib/bug';
	import './BugTag.scss';

	export let tagName: string;

	$: tag = $localizeTag(tagName);
</script>

<main class="bug-tag">
	<a href="?tag={tagName}">{tag}</a>
</main>
