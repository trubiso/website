<script lang="ts">
	import { order } from '$lib/json';
	import './Picker.scss';
	import LangPickerItem from './LangPickerItem.svelte';
</script>

<main class="opt opt-lang">
	<div class="opt-picker">
		{#each order.langs as lang}
			<LangPickerItem name={lang} />
		{/each}
	</div>
</main>
