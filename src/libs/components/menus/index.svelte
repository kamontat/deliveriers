<script lang="ts">
  import type { StoreGet } from "$mongodb/models/store";

  export let store: StoreGet;
</script>

<div>
  <slot />
  {JSON.stringify(store)}
</div>
