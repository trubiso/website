<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import './Pointer.scss';

	export let height: string = '0';
	export let width: string;
	export let mrel: string = '1';
	$: twod = height !== '0';

	$: boxHeight = parseInt(height);
	$: boxWidth = parseInt(width);
	$: multRel = parseFloat(mrel);

	let oldLeft = 0;
	let oldTop = 0;
	export let x = 0;
	export let y = 0;

	export let relX = 0;
	export let relY = 0;

	export let xOffset = -5;
	export let yOffset = -5;

	export let irelX = false;
	export let irelY = false;

	export let noRound = false;

	const dispatch = createEventDispatcher();

	function dragMouseDown(e: MouseEvent) {
		oldLeft = e.clientX;
		oldTop = e.clientY;
		document.onmouseup = stopDrag;
		document.onmousemove = drag;
	}

	function drag(e: MouseEvent) {
		x -= oldLeft - e.clientX;
		y -= oldTop - e.clientY;
		oldLeft = e.clientX;
		oldTop = e.clientY;
		clampPos();
		dispatch('change');
	}

	function clampPos() {
		x = Math.max(x, 0);
		y = Math.max(y, 0);
		x = Math.min(x, boxWidth);
		y = Math.min(y, boxHeight);
		relX = (x / boxWidth) * multRel;
		relY = (y / boxHeight) * multRel;
		if (irelX) relX = 1 - relX;
		if (irelY) relY = 1 - relY;

		if (!noRound) {
			relX = Math.round(relX);
			relY = Math.round(relY);
		}
	}

	function stopDrag() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
</script>

<main>
	<div
		class="point"
		style="--x:{x + xOffset}px;--y:{y + yOffset}px;"
		class:point-alt={twod}
		on:mousedown={dragMouseDown}
	/>
</main>
