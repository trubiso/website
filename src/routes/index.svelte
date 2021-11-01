<script lang="ts">
import { getTextCollection } from "$lib/vars";


	let lang = 0;
	const reasons = getTextCollection("index.reasons");
	const texts = getTextCollection("index.texts");
	const langs = getTextCollection("langs");
	const langChange = v=>{
		const s = document.getElementById("lang") as HTMLSelectElement;
		lang = langs.indexOf(s.value) ?? 0;
	}
</script>


<svelte:head>
	<title>hoem</title>
</svelte:head>

<section>
	<h1>{texts[lang][0]}</h1>
	{texts[lang][1]}
	<ol>
		{#each reasons[lang] as reason}
			<li>{reason}</li>
		{/each}
	</ol>
	{texts[lang][2]}
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
