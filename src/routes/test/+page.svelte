<script lang="ts">
	const pages = ['hsv', 'login', 'strainer'];
</script>

<main>
	<h1>tests</h1>
	<ul>
		{#each pages as page}
			<li>
				<a href="/test/{page}">{page}</a>
			</li>
		{/each}
	</ul>
</main>
