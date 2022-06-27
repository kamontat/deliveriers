<script lang="ts">
  import { protectedRoute } from "$lib/authentication";

  let name: string = "Create new review page";

  $: protectedRoute();
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<h1>Create new review</h1>
