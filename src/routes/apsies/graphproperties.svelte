<script lang="ts">
  import { Point } from '$lib/vars';

  import { onMount } from 'svelte';

  let zoom = 25;
  let offset = new Point(0, 0);

  const points: Point[] = [];

  let newPoint = new Point(0, 0);

  let canvas: HTMLCanvasElement;

  function mctpc(mc: Point, size: Point) {
    return new Point(mc.x + size.x / 2, -mc.y + size.y / 2);
  }

  function drawGrid(
    ctx: CanvasRenderingContext2D,
    precision: number,
    offset: Point = new Point(0, 0)
  ) {
    ctx.strokeStyle = '#000';
    const xMin = 0;
    const yMin = 0;
    const xMax = Math.max(ctx.canvas.width, ctx.canvas.width * (zoom / 20));
    const yMax = Math.max(ctx.canvas.height, ctx.canvas.height * (zoom / 20));
    const xCenter = ctx.canvas.width / 2 + offset.x;
    const yCenter = ctx.canvas.height / 2 + offset.y;
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(xMin, yCenter);
    ctx.lineTo(xMax, yCenter);
    ctx.moveTo(xCenter, yMin);
    ctx.lineTo(xCenter, yMax);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 0.5;

    for (let n = 0; n <= xMax; n += precision) {
      ctx.moveTo(xCenter - n, yMin);
      ctx.lineTo(xCenter - n, yMax);
      ctx.moveTo(xCenter + n, yMin);
      ctx.lineTo(xCenter + n, yMax);
    }

    for (let n = 0; n <= yMax; n += precision) {
      ctx.moveTo(xMin, yCenter - n);
      ctx.lineTo(xMax, yCenter - n);
      ctx.moveTo(xMin, yCenter + n);
      ctx.lineTo(xMax, yCenter + n);
    }

    ctx.stroke();
  }

  function drawGraph() {
    const usedOffset = offset.scale(zoom / 20);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, zoom, usedOffset);

    points.sort((a, b) => a.x - b.x);

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#f00';
    ctx.fillStyle = '#f00';
    ctx.beginPath();
    for (const point of points) {
      let convertedPoint = mctpc(point.scale(zoom), new Point(canvas.width, canvas.height));
      convertedPoint = convertedPoint.move(usedOffset);
      ctx.lineTo(convertedPoint.x, convertedPoint.y);
      ctx.fillRect(convertedPoint.x - 5, convertedPoint.y - 5, 10, 10);
    }
    ctx.stroke();
  }

  function addPoint() {
    points.push(newPoint);
    newPoint = new Point(0, 0);
    drawGraph();
  }

  onMount(() => {
    drawGraph();
  });
</script>

<main>
  <canvas bind:this={canvas} width="400" height="400" />

  <div class="np">
    <div>
  <label for="npx">new point x ({newPoint.x})</label>
  <input id="npx" type="range" min=-100 max=100 bind:value={newPoint.x} />
</div>
<div>
  <label for="npy">new point y ({newPoint.y})</label>
  <input id="npy" type="range" min=-100 max=100 bind:value={newPoint.y} />
</div>
<input type="submit" on:click={addPoint} value="create point">
  </div>

  <div class="view">
    <h2>view</h2>
    <div>
      <label for="zoom">zoom ({Math.floor((zoom / 25) * 100)}%)</label>
      <input id="zoom" type="range" min="10" bind:value={zoom} on:input={drawGraph} />
    </div>

    <div>
      <label for="xOffset">x offset ({offset.x})</label>
      <input
        id="xOffset"
        type="range"
        min="-100"
        max="100"
        bind:value={offset.x}
        on:input={drawGraph}
      />
    </div>

    <div>
      <label for="yOffset">y offset ({offset.y})</label>
      <input
        id="yOffset"
        type="range"
        min="-100"
        max="100"
        bind:value={offset.y}
        on:input={drawGraph}
      />
    </div>
  </div>
</main>
