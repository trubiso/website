<script lang="ts">
	import { HEXtoHSV, HSVtoHEX, validateHEX } from '$lib/color';
	import { t } from '$lib/localization';
	import { copiedColor } from '$lib/stores';

	import { createEventDispatcher } from 'svelte';
	import { get } from 'svelte/store';
	import './AllPickers.scss';
	import ColorPreview from './ColorPreview.svelte';

	import HsvPicker from './hsv/HsvPicker.svelte';
	import RgbHexPicker from './rgbhex/RgbHexPicker.svelte';

	export let oldColor = '#000000';
	export let hex: string;
	export let label = '';

	let hue = 0,
		sat = 0,
		val = 0;

	function syncHEX() {
		importHEX(HSVtoHEX(hue, sat, val));
		change();
	}

	function syncHSV() {
		importHSV(...HEXtoHSV(hex));
		change();
	}

	export function changeHEX(newHex: string) {
		hex = newHex;
		[hue, sat, val] = HEXtoHSV(hex);
		importHEX(hex);
		importHSV(hue, sat, val);
	}

	let importHSV: (h: number, s: number, v: number) => {};
	let importHEX: (newHex: string) => {};

	const dispatch = createEventDispatcher();
	function change() {
		dispatch('change');
	}

	async function copy() {
		copiedColor.set(hex);
	}

	async function paste() {
		changeHEX(get(copiedColor));
		change();
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
		change();
	}

	function reset() {
		changeHEX(oldColor);
		change();
	}

	function done() {
		dispatch('done');
	}

	let pickerHeight = 725;
</script>

<main>
	<div
		class="all-pickers-wrap"
		bind:clientHeight={pickerHeight}
		style="--pickerHeight:{pickerHeight}px;"
	>
		<div class="all-pickers">
			<h1 class="header">{label}</h1>
			<HsvPicker bind:hue bind:sat bind:val bind:importHSV on:change={syncHEX} />
			<div class="side-pickers">
				<RgbHexPicker bind:hex bind:importHEX on:change={syncHSV} />
				<div class="previews">
					<ColorPreview hex={oldColor} label={t('color.old')} />
					<ColorPreview {hex} label={t('color.new')} />
					<ColorPreview hex={$copiedColor} label={t('color.saved')} />
				</div>
				<div class="filler" />
				<div class="actions">
					<button on:click={copy}>{t('color.save')}</button>
					<button on:click={paste}>{t('color.load')}</button>
					<button on:click={copyToClipboard}>{t('color.copy')}</button>
					<button on:click={pasteFromClipboard}>{t('color.paste')}</button>
					<button on:click={reset}>{t('color.reset')}</button>
					<button on:click={done}>{t('color.done')}</button>
				</div>
			</div>
		</div>
	</div>
</main>
