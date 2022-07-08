<script lang="ts">
  export let id: string;
  export let name: string;
  export let tags: string[];
  export let extra: string;

  export let onView: (id: string) => () => void;
  export let onReview: (id: string) => () => void;
</script>

<div class="flex flex-row justify-between py-3 px-3 border-b first:border-t" name={id}>
  <div class="flex-1">
    <div>
      <span>{name}</span>
      <span class="text-xs">({extra})</span>
    </div>

    <div class="my-2">
      {#each tags as tag}
        <span class="p-1 text-xs border rounded border-blue-400">{tag}</span>
      {/each}
    </div>
  </div>
  <div class="flex-none flex flex-col justify-center">
    <button on:click={onView(id)} class="mx-2 my-1">View</button>
    <button on:click={onReview(id)} class="mx-2 my-1">Review</button>
  </div>
</div>
