<script lang="ts">
  import type { Reviews } from "$lib/reviews/models";

  import { protectedRoute, user } from "$lib/authentication";

  let name: string = "Search reviews page";
  $: protectedRoute();

  const reviews = $user?.callFunction<Reviews>("reviews/list");
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<h1>Searching reviews</h1>

{#if reviews}
  {#await reviews}
    <p>loading...</p>
  {:then reviews}
    {reviews.total}
    {#each reviews.rows as row}
      <p>{row.id} - {row.star} - {row.description}</p>
    {/each}
  {/await}
{/if}
