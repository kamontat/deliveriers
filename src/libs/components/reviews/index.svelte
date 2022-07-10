<script lang="ts">
  import type { StoreGet } from "$mongodb/models/store";

  import Container from "./container.svelte";

  export let store: StoreGet;
</script>

<Container>
  {#each store.reviews as review}
    <div>
      <span>{review.title}</span>
      <p>{review.comment}</p>
    </div>
  {/each}
</Container>
