<script lang="ts">
	import hljs from 'highlight.js';
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let slotObj: HTMLElement;
	onMount(async () => {
		let html = slotObj.innerHTML;
		html = marked(html, {
      renderer: new marked.Renderer(),
			highlight: function (code, lang) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			},
      langPrefix: 'hljs language-',
			xhtml: true
		});
    slotObj.innerHTML = html;
	});
</script>

<span bind:this={slotObj}><slot /></span>
