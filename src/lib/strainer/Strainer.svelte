<!--TODO: pages-->
<!--TODO: add config menu to add these back-->

<script lang="ts" context="module">
	export interface StrainerFilter {
		property: string;
		values: string[];
		exact: boolean;
	}

	export enum Order {
		AtoZ,
		ZtoA,
		Reversed,
		Random
	}
	export interface StrainerSort {
		order: Order;
		property: string | null;
	}

	export interface StrainerDataSettings {
		filters: StrainerFilter[];
		sorts: StrainerSort[];
	}

	export interface StrainerPaging {
		wantsPaging: boolean;
		itemsPerPage: number;
	}

	export type StrainerData = { [key: string]: any }[];
</script>

<script lang="ts">
	import { shuffle } from '$lib/array';
	import type { SvelteComponent } from 'svelte';
	import './Strainer.scss';
	import StrainerOptions from './StrainerOptions.svelte';

	export let data: StrainerData;

	function useFilters(data: StrainerData, filters: StrainerFilter[]) {
		for (const filter of filters) {
			if (filter.exact) data = data.filter((x) => filter.values.some((y) => x[filter.property].toString() === y));
			else data = data.filter((x) => filter.values.some((y) => x[filter.property].toString().includes(y)));
		}

		return data;
	}

	function useSorts(data: StrainerData, sorts: StrainerSort[]) {
		for (const sort of sorts) {
			if (sort.order === Order.Random) {
				data = shuffle(data);
				continue;
			}

			if (sort.order === Order.Reversed) {
				data = data.reverse();
				continue;
			}

			// now AtoZ or ZtoA
			const factor = sort.order === Order.AtoZ ? -1 : 1;

			data = data.sort((a, b) =>
				a[sort.property!] < b[sort.property!]
					? factor
					: a[sort.property!] > b[sort.property!]
					? -factor
					: 0
			);
		}

		return data;
	}

	function processData(data: StrainerData, settings: StrainerDataSettings) {
		let copied = [...data];
		copied = useFilters(copied, settings.filters);
		copied = useSorts(copied, settings.sorts);

		return copied;
	}

	export let renderComponent: typeof SvelteComponent;

	export let gridType: 'h' | 'v' = 'v';
	export let dataSettings: StrainerDataSettings = {
		filters: [],
		sorts: [
			{
				order: Order.Random,
				property: null
			}
		]
	};
</script>

<main class="strainer">
	<StrainerOptions bind:gridType={gridType} />
	<div class="strainer-grid grid-{gridType}">
		{#each processData(data, dataSettings) as entry}
			<div class="grid-entry">
				<svelte:component this={renderComponent} {...entry} />
			</div>
		{/each}
	</div>
</main>
