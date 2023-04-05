<script lang="ts">
	import { langs, order } from '$lib/json';
	import { lang } from '$lib/stores';

	export let name = 'en';

	$: idx = order.langs.findIndex((v) => v === name);
	$: title = (langs as Record<string, string>)[name];

	function changeTheme() {
		lang.set(name);
	}
</script>

<main>
	<a href="#h" class="opt-picker-item-wrap" on:click|preventDefault={changeTheme}>
		<div class="opt-picker-item" class:alt-bg={idx % 2}>
			{title}
		</div>
	</a>
</main>
