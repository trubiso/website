<script lang="ts">
	import { t } from '$lib/localization';
	import './PageSwitcherPageSelector.scss';

	export let defaultNumber: number;
	export let maximumNumber: number;

	let chosen = defaultNumber;

	function jump() {
		if (chosen > maximumNumber) {
			alert($t('navigation.jumpToPageTooHigh'));
			return;
		}

		if (chosen < 1) {
			alert($t('navigation.jumpToPageTooLow'));
			return;
		}

		location.search = `?page=${chosen}`;
	}
</script>

<main class="page-switcher-page-selector">
	<div class="thing">
		<div>
			<span>{$t('navigation.jumpToPage')}</span>
		</div>
		<div>
			<input type="number" bind:value={chosen} name="r" id="r" min="1" max={maximumNumber} />
		</div>
		<div>
			<button on:click={jump}>{$t('navigation.jumpToPageButton')}</button>
		</div>
	</div>
</main>
