<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import './Pointer.scss';

	export let height: string | number = '0';
	export let width: string | number;
	export let mrel: string = '1';
	$: twod = height !== '0';

	$: boxHeight = typeof height == 'number' ? height : parseInt(height);
	$: boxWidth = typeof width == 'number' ? width : parseInt(width);
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

	function dragTouchDown(e: TouchEvent) {
		let px = e.touches[0].pageX;
		let py = e.touches[0].pageY;
		if (oldLeft !== 0) {
			x += px - oldLeft;
			if (twod) y += py - oldTop;
		}
		oldLeft = px;
		oldTop = py;
		document.ontouchcancel = stopDrag;
		document.ontouchmove = dragTouch;
	}

	function dragTouch(e: TouchEvent) {
		let px = e.touches[0].pageX;
		let py = e.touches[0].pageY;
		x -= oldLeft - px;
		y -= oldTop - py;
		oldLeft = px;
		oldTop = py;
		clampPos();
	}

	function dragMouseDown(e: MouseEvent) {
		if (oldLeft !== 0) {
			x += e.clientX - oldLeft;
			if (twod) y += e.clientY - oldTop;
		}
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
	}

	function clampPos() {
		x = Math.max(x, 0);
		y = Math.max(y, 0);
		x = Math.min(x, boxWidth);
		y = Math.min(y, boxHeight);
		relX = (x / boxWidth) * multRel;
		relY = (y / boxHeight) * multRel;
		if (irelX) relX = multRel - relX;
		if (irelY) relY = multRel - relY;

		if (!noRound) {
			relX = Math.round(relX);
			relY = Math.round(relY);
		}

		dispatch('change');
	}

	function stopDrag() {
		document.onmouseup = null;
		document.onmousemove = null;
		document.ontouchcancel = null;
		document.ontouchmove = null;
	}
</script>

<main>
	<div
		class="point-area"
		style="width:{width.toString()}px;height:{twod ? height.toString() : '25'}px;"
		on:mousedown|preventDefault={dragMouseDown}
		on:touchstart|preventDefault={dragTouchDown}
	>
		<div class="point" style="--x:{x + xOffset}px;--y:{y + yOffset}px;" class:point-alt={twod} />
	</div>
</main>
