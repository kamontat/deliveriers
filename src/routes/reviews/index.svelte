<script lang="ts">
  import type { Reviews } from "$lib/reviews/models";

  import { user, ensureUser } from "$lib/authentication";
  import { request, REVIEWS_LIST_FNAME } from "$lib/repositories";

  let name: string = "Reviews";

  const reviews = request(ensureUser($user), REVIEWS_LIST_FNAME);
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<h1>Searching reviews</h1>

{#await reviews}
  <p>loading...</p>
{:then reviews}
  {reviews.total}
  {#each reviews.rows as row}
    <p>{row.id} - {row.star} - {row.description}</p>
  {/each}
{/await}
