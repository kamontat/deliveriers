<script lang="ts">
  import type { StoreGet } from "$mongodb/models/store";
  import Container from "./container.svelte";

  export let store: StoreGet;
</script>

<Container>
  {#each store.menus as menu}
    <div>
      <span>{menu.name}</span>
    </div>
  {/each}
</Container>
