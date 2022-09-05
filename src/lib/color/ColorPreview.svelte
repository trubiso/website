<script lang="ts">
	import './ColorPreview.scss';

	export let hex: string;
  export let label: string = '';
</script>

<main class="color-preview-wrap">
	<div class="color-preview" style="--color-preview: {hex};" id="color-preview" />
  {#if label !== ''}
  <label for="color-preview">{label}</label>
  {/if}
</main>
