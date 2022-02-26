<script lang="ts">
	import { onMount } from 'svelte';
	const getVars = (): HTMLElement[] => {
		if (!document.getElementById('kity')) throw '';
		if (!document.getElementById('moarkity')) throw '';

		return [document.getElementById('kity'), document.getElementById('moarkity')];
	};

	const h = () => {
		const [, b] = getVars();
		b.innerText = 'get mor kity';
		b.removeAttribute('disabled');
	};

	const getNewKity = () => {
		const [i, b] = getVars();
		i.setAttribute('src', `https://placekitten.com/${Math.floor(Math.random() * 600 + 200)}`);
		b.innerText = 'geting kity...';
		b.setAttribute('disabled', '');
		i.onload = h;
	};

	onMount(() => {
		getVars()[0].onload = h;
	});
</script>

<svelte:head>
	<title>kity</title>
</svelte:head>

<section>
	<img src="https://placekitten.com/{Math.floor(Math.random() * 600 + 200)}" alt="kity" id="kity" />
	<br />
	<button
		on:click={() => {
			getNewKity();
		}}
		id="moarkity"
		disabled>geting kity...</button
	>
</section>
