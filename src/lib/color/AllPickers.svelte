<script lang="ts">
	import { validateHEX } from '$lib/color';
	import { copiedColor, sidebarLocation } from '$lib/stores';

	import { createEventDispatcher } from 'svelte';
	import { get } from 'svelte/store';
	import './AllPickers.scss';
	import ColorPreview from './ColorPreview.svelte';

	import HsvPicker from './hsv/HsvPicker.svelte';
	import RgbHexPicker from './rgbhex/RgbHexPicker.svelte';

	export let oldColor = '#000000';
	export let hex: string;

	let hue = 0,
		sat = 0,
		val = 0;

	function syncHEX() {
		importHSV(hue, sat, val);
		change();
	}

	function syncHSV() {
		importHEX(hex);
		change();
	}

	export function changeHEX(newHex: string) {
		hex = newHex;
		syncHSV();
	}

	let importHEX: (hex: string) => {};
	let importHSV: (h: number, s: number, v: number) => {};

	const dispatch = createEventDispatcher();
	function change() {
		dispatch('change');
	}

	async function copy() {
		copiedColor.set(hex);
	}

	async function paste() {
		changeHEX(get(copiedColor));
	}

	async function copyToClipboard() {
		await navigator.clipboard.writeText(hex);
		alert(`copied color (${hex}) to clipboard`);
	}

	async function pasteFromClipboard() {
		if (typeof navigator.clipboard.readText != 'function') {
			alert(
				'your browser does not support pasting from the clipboard, please paste the color in the "hex" field instead :)'
			);
			return;
		}
		const newHex = await navigator.clipboard.readText();
		if (!validateHEX(newHex)) {
			alert(`cannot paste ${newHex} (not a color)`);
			return;
		}
		changeHEX(newHex);
	}

	function reset() {
		changeHEX(oldColor);
	}

	function done() {
		dispatch('done');
	}
</script>

<main>
	<div class="all-pickers-wrap" class:sidebar-alt={$sidebarLocation}>
		<div class="all-pickers">
			<HsvPicker bind:hue bind:sat bind:val bind:importHEX on:change={syncHEX} />
			<div class="side-pickers">
				<RgbHexPicker bind:hex bind:importHSV on:change={syncHSV} />
				<div class="previews">
					<ColorPreview hex={oldColor} label="old" />
					<ColorPreview {hex} label="new" />
					<ColorPreview hex={$copiedColor} label="saved" />
				</div>
				<div class="filler" />
				<div class="actions">
					<button on:click={copy}>save</button>
					<button on:click={paste}>load</button>
					<button on:click={copyToClipboard}>copy to clipboard</button>
					<button on:click={pasteFromClipboard}>paste from clipboard</button>
					<button on:click={reset}>reset</button>
					<button on:click={done}>done</button>
				</div>
			</div>
		</div>
	</div>
</main>
