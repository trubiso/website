<script lang="ts">
	import { bugTags, localizeTag, sectionNames, sectionedBugTags } from '$lib/bug';
	import { t } from '$lib/localization';
	import BugTag from './BugTag.svelte';
	import './BugTagPicker.scss';

	export let chosen = <string[]>[];
	let newTag = '';

	function addTag() {
		if (chosen.includes(newTag)) return;
		chosen.push(newTag);
		chosen.sort((a, b) => bugTags.findIndex((x) => x === a) - bugTags.findIndex((x) => x === b));
		chosen = chosen;
	}

	function removeTag(tag: string): () => void {
		return () => {
			chosen = chosen.filter((x) => x !== tag);
		};
	}
</script>

<main class="bug-tag-picker">
	{#each chosen as tag}
		<BugTag tagName={tag} noLink>
			<button class="bug-tag-picker-close" on:click|preventDefault={removeTag(tag)}>X</button>
		</BugTag>
	{/each}
	<form action="" on:submit|preventDefault={addTag}>
		<select name="newTag" id="newTag" bind:value={newTag}>
			{#each sectionedBugTags as tags, i}
				<optgroup label={$t(sectionNames[i])}>
					{#each tags as tag}
						<option value={tag}>{$localizeTag(tag)}</option>
					{/each}
				</optgroup>
			{/each}
		</select>
		<button on:click|preventDefault={addTag}>+</button>
	</form>
</main>
