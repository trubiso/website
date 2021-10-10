<script lang="ts">
	let lang = 0;
	const reasons = [
		[
			"its great",
			"it uses svelte",
			"it is pretty",
			"it has a great point of view on industrail machinery",
			"it has typos (see item above)",
			"h"
		],
		[
			"its greate !!!",
			"it usese svelteing",
			"it is prety",
			"it has a greate pointe of viewe on indsustrileale machienery",
			"it hase typoese (see ietem abov)",
			"h"
		],
		[
			"grongo garqo !!",
			"brugo gango svelte grogona",
			"goqo gahoq gruno",
			"girino grabo grobo grnokwo fragow wogowno gragohoqoqo grobogo",
			"gingo gaga goobo gaga boog (grogo gano gobo)",
			"h"
		],
		[
			"es excelente",
			"usa svelte",
			"es bonita",
			"tiene un muy buen punto de vista sobre las máquinas indsutriales",
			"tiene erratas (mira el punto anterior)",
			"h"
		]
	]
	const texts = [
		[
			"welcome to my website",
			"why you should use it:",
			"languages:"
		],
		[
			"welcom to my websiet !!!1",
			"why yu shulde use it:",
			"languegese:"
		],
		[
			"grono gago websiet bogo grano !",
			"guro gaobo qagofo grukwago:",
			"groqo grabo:"
		],
		[
			"bienvenido a mi página web",
			"por qué deberías usarla:",
			"idiomas:"
		]
	]
	const langs = [
		"English (UK/US)",
		"English (Smilieland)",
		"Oogie Boogie (Kqüntniétt)",
		"Español (España)"
	]
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
