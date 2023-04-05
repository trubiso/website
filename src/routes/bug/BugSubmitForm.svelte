<script lang="ts">
	import { f, t } from '$lib/localization';
	import Emote from '$lib/text/Emote.svelte';
	import type { bug } from '@prisma/client';
	import Bug from './Bug.svelte';
	import './BugSubmitForm.scss';

	let hasSubmittedBug = false;
	$: name = '';
	$: description = '';
	$: tags = [] as string[];
	async function submitBug() {
		return await fetch(`/api/bug`, {
			method: 'POST',
			body: JSON.stringify({
				name,
				description,
				tags
			})
		}).then((v) => v.json());
	}

	let bugPromise: Promise<any>;

	function handleSubmit() {
		if (hasSubmittedBug) {
			name = '';
			description = '';
			tags = [];
		} else {
			bugPromise = submitBug();
		}
		hasSubmittedBug = !hasSubmittedBug;
	}

	$: sampleBug = {
		id: '',
		created_at: new Date(),
		name: name.trim() === '' ? $t('bug.placeholderName') : name,
		description: description.trim() === '' ? $t('bug.placeholderDescription') : description,
		tags,
		approved: true
	} as bug;
</script>

<main class="bug-submit-form">
	{#if !hasSubmittedBug}
		<p>{$t('bug.encourage')}</p>
	{/if}
	<form action="" method="post" on:submit|preventDefault={handleSubmit}>
		<div class="bug-input" class:smaller-qi={hasSubmittedBug}>
			{#if !hasSubmittedBug}
				<input
					type="text"
					name="name"
					id="name"
					placeholder={$t('bug.placeholderName')}
					bind:value={name}
					required
				/>
				<textarea
					name="description"
					id="description"
					placeholder={$t('bug.placeholderDescription')}
					cols="30"
					rows="10"
					bind:value={description}
					required
				/>
				<label for="bug">{$t('bug.preview')}</label>
				{#key sampleBug}
					<div id="bug">
						<Bug bug={sampleBug} />
					</div>
				{/key}
				<input type="submit" value={$f('submitForm.send')({ object: $t('bug.bug') })} />
			{:else}
				{#await bugPromise}
					<label for="">{$f('submitForm.sending')({ object: $t('bug.bug') })}</label>
					<Emote name="silly" spinning />
				{:then result}
					{#if result.success}
						<label for="">{$f('submitForm.sendSuccess')({ object: $t('bug.bug') })}</label>
						<input type="submit" value={$f('submitForm.sendMore')({ object: $t('bug.bug') })} />
					{:else}
						<label for="">{$f('submitForm.sendError')({ object: $t('bug.bug') })} !!</label>
						<Emote name="shock" scaling />
						<!--TODO: named errors-->
						<p>{$t('q+a.errorOther')}</p>
						<pre>{JSON.stringify(result.error)}</pre>
						<input type="submit" value={$f('submitForm.tryAgain')({ object: $t('bug.bug') })} />
					{/if}
				{/await}
			{/if}
		</div>
	</form>
</main>
