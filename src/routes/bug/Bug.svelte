<script lang="ts">
	import type { bug } from '@prisma/client';

	export let bug: bug;
</script>

<main class="bug">
	<b>id: </b>{bug.id}
	<br />
	<b>created at: </b>{bug.created_at}
	<br />
	<b>name: </b>{bug.name}
	<br />
	<b>description: </b>{bug.description}
	<br />
	<b>tags: </b>{bug.tags.length === 0 ? "none" : bug.tags.join(", ")}
	<br>
</main>
