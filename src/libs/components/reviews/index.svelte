<script lang="ts">
  import type { Review } from "$mongodb/models/review";

  import type { StoreGet } from "$mongodb/models/store";

  import Container from "./container.svelte";

  export let store: StoreGet;

  let reviews: Review[] = [];
  $: {
    // Reviews with empty menus is reviews to store.
    reviews = store.reviews.filter((r) => r.menus.length < 1);
  }
</script>

<Container>
  {JSON.stringify(reviews)}
</Container>
