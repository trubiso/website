<script lang="ts">
	import { stringsForLang } from '$lib/functions';
	import { langs } from '$lib/json';
	import EmoteZone from '$lib/text/EmoteZone.svelte';

	const l = (<[keyof typeof langs, string][]>Object.entries(langs)).filter(
		([key, _]) => <string>key !== 'default'
	);
	const q = <{ [k in keyof typeof langs]: number }>(
		Object.fromEntries(l.map(([key, _]) => [key, stringsForLang(key)]))
	);
	const t = q['en'];
</script>

<main>
	<h1>translation</h1>
	<p>
		hi this is just a quick page i'm throwing together to find out how translated some languages are
	</p>
	<p><EmoteZone>IN THE FUTURE you will be able to translate from here :happy:</EmoteZone></p>
	<ul>
		{#each l as [key, name]}
			<li><b>{name} (<code>{key}</code>): </b>{q[key]} ({((q[key] / t) * 100).toFixed(2)}%)</li>
		{/each}
	</ul>
</main>
