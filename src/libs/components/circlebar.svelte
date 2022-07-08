<script lang="ts">
  export let progress: number;
  export let minimum: number;
  export let maximum: number;

  const radius = 21;
  const circumference = radius * 2 * Math.PI;
  let offset = 0;
  $: {
    let percent = ((progress - minimum) * 100) / (maximum - minimum);
    offset = circumference - (percent / 100) * circumference;
  }
</script>

<svg class="h-12 w-12">
  <circle
    class="outliner stroke-gray-300 opacity-30"
    style="r: {radius}px; stroke-dasharray: {circumference} {circumference}; stroke-dashoffset: {offset};"
  />
  <circle
    class="stroke-black"
    style="r: {radius}px; stroke-dasharray: {circumference} {circumference}; stroke-dashoffset: {offset};"
  />
  <text class="circle-text stroke-2" x="50%" y="50%" dy=".3em">{progress.toFixed(2)}</text>
</svg>

<style>
  circle {
    cx: 50%;
    cy: 50%;

    stroke-width: 4px;
    fill: transparent;

    transition: 0.35s stroke-dashoffset;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }

  .outliner {
    stroke-width: 4px;

    transition: 0.35s stroke-dashoffset;
    transform: rotate(90deg);
    transform-origin: 50% 50%;
  }

  .circle-text {
    text-anchor: middle;
  }
</style>
