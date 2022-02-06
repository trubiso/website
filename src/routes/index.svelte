<script lang="ts">
import { getTextCollection, lang } from "$lib/vars";
import { onMount } from "svelte";
	const reasons = getTextCollection("index.reasons");
	const texts = getTextCollection("index.texts");
	const langs = getTextCollection("langs");
	const langChange = v=>{
		const s = document.getElementById("lang") as HTMLSelectElement;
		lang.set(langs.indexOf(s.value) ?? 0);
	}

	let cl;
	let hl = false;
	lang.subscribe(value => {
		cl = value;
		if (hl) {
			(document.getElementById("lang") as HTMLSelectElement).value = langs[value];
		}
	});

	onMount(()=>{
		hl = true;
		(document.getElementById("lang") as HTMLSelectElement).value = langs[cl];
	});
</script>


<svelte:head>
	<title>hoem</title>
</svelte:head>

<section>
	<h1>{texts[cl][0]}</h1>
	{texts[cl][1]}
	<ol>
		{#each reasons[cl] as reason}
			<li>{reason}</li>
		{/each}
	</ol>
	{texts[cl][2]}
	<select id="lang" on:change={langChange}>
		{#each langs as lang}
			<option value="{langs.find(v=>v===lang)}">{lang}</option>
		{/each}
	</select>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* align-items: center; */
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
