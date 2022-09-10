<script lang="ts">
	import { theme } from '$lib/stores';

	import { codeToTheme, themeToCode } from '$lib/themes';

	function exportTheme() {
		const code = themeToCode($theme);
		navigator.clipboard.writeText(code);
		alert(`theme code has been copied to clipboard (${code})`);
	}

	function importTheme() {
		const code = prompt('write theme code:');
		if (!code) return;
		try {
			const t = codeToTheme(code);
			theme.set(t);
			alert(`theme has successfully been set :)`);
		} catch (e) {
			alert(`invalid theme code! (entered: ${code})`);
		}
	}
</script>

<main>
	<button on:click={exportTheme}>export theme</button>
	<button on:click={importTheme}>import theme</button>
</main>
