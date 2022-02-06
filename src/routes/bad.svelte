<script lang="ts">
	const ss = (a: string) => (document.getElementsByTagName("section")) ? (document.getElementsByTagName("section")[0].innerHTML = a) : 1;
	const cln = ()=>{
		ss(
			"<h1>why didn't you listen to me</h1>\
			<br>that's rude<span style='opacity: 2%; cursor: default;'> (or is it? use 'dQw4w9WgXcQ')</span>"
		);
	}
	const lp = ()=>{
		document.getElementById("huh").parentElement.innerHTML += "<br><img src='https://cdn.discordapp.com/emojis/717683480787550228.png' alt='h' />"
		setTimeout(lp, 1000)
	}
	const nl = ()=>{
		if ((document.getElementById("huh") as HTMLInputElement)?.value === "dQw4w9WgXcQ") {
			lp();
		}
	}
</script>

<svelte:head>
	<title>don't cliq</title>
</svelte:head>

<section>
	THIS IS A VERY BAD PAGE. LEAVE IT IMMEDIATELY.
	<br><br><br><br>(there's nothing more to it)
	<br><br><br><br>(just leave it)
	<br><br><br><br>
	<br><br><br><br>(please)
	<br><br><br><br>
	<br><br><br><br>
	<br><br><br><br>(don't waste your time)
	<br><br><br><br>
	<br><br><br><br>
	<br><br><br><br>
	<br><br><br><br><span on:click="{cln}" style="cursor: pointer;">(leave now)</span>
</section>

<section id="h">
	<input type="text" id="huh" value="" on:change|preventDefault="{nl}">
</section>