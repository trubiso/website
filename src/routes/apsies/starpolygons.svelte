<script lang="ts">
  import Emote from '$lib/emote.svelte';
import Meta from '$lib/meta.svelte';

  import { clamp, clampOverflow } from '$lib/vars';

  import { onMount } from 'svelte';

  class Point {
    constructor(public x: number, public y: number) {}
    toString() {
      return `(${this.x}, ${this.y})`;
    }
    toArray() {
      return [this.x, this.y];
    }
  }

  let canvas: HTMLCanvasElement;

  let size = 50;
  let sides = 5;
  let stride = 2;
  let showCircle = true;
  let showLine = true;
  let showPoints = true;
  let fill = true;
  let canBeDrawn = true;

  let circleColor = '#ff0000';
  let lineColor = '#000000';
  let pointColor = '#00ff00';
  let fillColor = '#00ffff';

  function getPoint(
    r: number,
    currentPoint: number,
    totalPoints: number,
    offset: Point,
    ctx: CanvasRenderingContext2D
  ): Point {
    const theta = (Math.PI * 2) / totalPoints;
    const angle = theta * currentPoint;

    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);

    return new Point(x + offset.x, y + offset.y);
  }

  function drawPolygon() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const offsetX = ctx.canvas.width / 2;
    const offsetY = ctx.canvas.height / 2;
    const offset = new Point(offsetX, offsetY);
    ctx.lineWidth = 3;

    if (showCircle) {
      ctx.strokeStyle = circleColor;
      ctx.beginPath();
      ctx.ellipse(offsetX, offsetY, size, size, 0, 0, 2 * Math.PI);
      ctx.stroke();
    }

    const points = [];
    for (var i = 1; i <= sides; i++) {
      points.push(getPoint(size, i, sides, offset, ctx));
    }

    const indices = [...Array(points.length).keys()].map((v, i) =>
      clampOverflow(i * stride, 0, points.length)
    );
    indices.push(sides - 2 - (stride - 2));

    canBeDrawn = true;
    let visitedAll = true;
    let visited = [];
    for (let i of indices) {
      visited[i] = true;
    }
    visitedAll = true;
    for (let i of visited) {
      if (!i) {
        visitedAll = false;
      }
    }
    if (!visitedAll) {
      canBeDrawn = false;
    }

    console.log(indices);

    try {
      if (!canBeDrawn) throw "can't be drawn";
      ctx.strokeStyle = lineColor;
      const path = new Path2D();
      path.moveTo(points[indices[0]].x, points[indices[0]].y);
      indices.forEach((i, j) => {
        const lastPointIdx = indices[clampOverflow(j - 1, 0, indices.length - 1)];
        const p1 = points[i]; // current point
        const p2 = points[lastPointIdx];
        path.lineTo(p2.x, p2.y);
      });
      path.closePath();
      if (fill) {
        ctx.fillStyle = fillColor;
        ctx.fill(path, 'nonzero');
      }
      if (showLine) {
        ctx.stroke(path);
      }
    } catch (e) {}

    if (showPoints) {
      ctx.fillStyle = pointColor;
      points.forEach((v) => {
        ctx.fillRect(v.x - 3, v.y - 3, 6, 6);
      });
    }
  }

  onMount(() => {
    drawPolygon();
  });
</script>

<Meta title="star-polygones" description="maek yur OWNE star-polygone !" />

<main>
  <h1>maek yur OWNE star-polygone !</h1>
  <canvas bind:this={canvas} width="350" height="150" class:unviewable={!canBeDrawn} />
  {#if !canBeDrawn}
    <div class="warning">
      <span>
        AAAHHE !! dis star-polygone dosnt exist or is a stare but not a polygone ! <Emote name="sad" size="36" spinning />
      </span>
    </div>
  {/if}
  <div class="flex">
    <div class="inputs">
      <div>
        <label for="size">Polygon radius: <b>{size}</b></label>
        <input type="range" min="25" max="73" bind:value={size} on:change={drawPolygon} id="size" />
      </div>
      <div>
        <label for="sides">Polygon sides: <b>{sides}</b></label>
        <input
          type="range"
          min="5"
          max="30"
          bind:value={sides}
          on:change={drawPolygon}
          id="sides"
        />
      </div>
      <div>
        <label for="stride">Polygon stride: <b>{stride}</b></label>
        <input
          type="range"
          min="2"
          max={Math.min(13, Math.floor(sides / 2))}
          bind:value={stride}
          on:change={drawPolygon}
          id="stride"
        />
      </div>
      <div>
        <label for="showCircle">Show circle: <b>{showCircle ? 'YES' : 'NO'}</b></label>
        <input type="checkbox" bind:checked={showCircle} on:change={drawPolygon} id="showCircle" />
      </div>
      <div>
        <label for="showLine">Show line: <b>{showLine ? 'YES' : 'NO'}</b></label>
        <input type="checkbox" bind:checked={showLine} on:change={drawPolygon} id="showLine" />
      </div>
      <div>
        <label for="showPoints">Show points: <b>{showPoints ? 'YES' : 'NO'}</b></label>
        <input type="checkbox" bind:checked={showPoints} on:change={drawPolygon} id="showPoints" />
      </div>
      <div>
        <label for="fill">Fill: <b>{fill ? 'YES' : 'NO'}</b></label>
        <input type="checkbox" bind:checked={fill} on:change={drawPolygon} id="fill" />
      </div>
      <div>
        <label for="circleColor">Circle color: <b>{circleColor}</b></label>
        <input type="color" bind:value={circleColor} on:change={drawPolygon} id="circleColor" />
      </div>
      <div>
        <label for="lineColor">Line color: <b>{lineColor}</b></label>
        <input type="color" bind:value={lineColor} on:change={drawPolygon} id="lineColor" />
      </div>
      <div>
        <label for="pointColor">Point color: <b>{pointColor}</b></label>
        <input type="color" bind:value={pointColor} on:change={drawPolygon} id="pointColor" />
      </div>
      <div>
        <label for="fillColor">Fill color: <b>{fillColor}</b></label>
        <input type="color" bind:value={fillColor} on:change={drawPolygon} id="fillColor" />
      </div>
    </div>
  </div>
</main>

<style lang="scss">
  .unviewable {
    display: none;
  }

  canvas {
    width: 350px;
    height: 150px;
    margin-bottom: 10px;
  }

  .warning {
    display: flex;
    font-size: 18pt;
    color: red;
    font-weight: bold;
    text-align: center;
    align-items: center;
    background-color: white;
    width: 350px;
    height: 150px;
    margin-bottom: 14px;
  }

  .flex {
    display: flex;
    flex-direction: row;
    width: 350px;

    .inputs {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      div {
        display: flex;
        align-items: center;
        width: 100%;
        input,
        label {
          flex: 1;
          min-height: 20px;
          max-height: 20px;
          min-width: calc(350px / 2 - 10px);
          max-width: calc(350px / 2 - 10px);
        }
        label {
          margin-right: 10px;
          text-align: right;
        }
        input {
          margin-left: 10px;
          text-align: left;
          align-items: flex-start;
        }
        input[type='checkbox'] {
          max-width: 20px;
          min-width: 20px;
        }
      }
    }
  }
</style>
