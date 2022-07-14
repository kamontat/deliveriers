<script lang="ts">
  import type { StoreGet } from "$mongodb/models/store";

  import Container from "./container.svelte";

  export let store: StoreGet;
</script>

<Container>
  {#each store.reviews as review}
    <div class="my-2 first:mt-0 last:mb-0 flex flex-col">
      <div class="flex justify-between">
        <span class="text-lg font-bold">{review.title}</span>
        <span>({review.rating})</span>
      </div>
      <p class="text-sm whitespace-pre-wrap">{review.comment}</p>
    </div>
  {/each}
</Container>
