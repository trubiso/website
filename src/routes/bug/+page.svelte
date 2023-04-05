<script lang="ts">
	import type { bug } from '@prisma/client';
	import Bug from './Bug.svelte';

	export let data: {
		bugs: bug[];
		tag: string | null;
	};
</script>

<main class="bugs">
	{#each data.bugs as bug}
		<Bug {bug} />
	{/each}
</main>
