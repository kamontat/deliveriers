<script lang="ts">
  import { formatDate } from "$lib/utils/date";

  type Callback = (id: string) => () => void;

  import Circlebar from "../circlebar.svelte";

  export let id: string;
  export let title: string;
  export let rating: number | undefined | null = undefined;
  export let tags: string[] = [];
  export let createAt: Date | undefined = undefined;

  export let onView: Callback | undefined = undefined;
  export let onReview: Callback | undefined = undefined;
</script>

<div class="flex flex-col justify-between border rounded-md p-2">
  <div class="flex">
    <div class="flex flex-col min-w-0 flex-1 mb-2">
      <span class="text-lg font-bold break-words">{title}</span>
      {#if createAt}
        <span class="text-xs italic">({formatDate(createAt, { format: "short" })})</span>
      {/if}
    </div>

    {#if rating}
      <div class="flex flex-none">
        <Circlebar progress={rating} minimum={0} maximum={5} mode="number" decimal={2} />
      </div>
    {/if}
  </div>
  <div class="mt-1 flex flex-wrap">
    {#each tags as tag}
      <span class="m-0.5 p-0.5 text-xs border rounded border-blue-400">{tag}</span>
    {/each}
  </div>
  <div class="mt-4 flex justify-center">
    {#if onView}
      <button
        class="w-20 border rounded-l-full border-l-sky-300 border-y-sky-300 text-center hover:shadow-lg"
        on:click={onView(id)}>View</button
      >
    {/if}

    {#if onReview}
      <button
        class="w-20 border-r border-y rounded-r-full border-y-pink-400 border-r-pink-400 text-center hover:shadow-lg"
        on:click={onReview(id)}>Review</button
      >
    {/if}
  </div>
</div>
