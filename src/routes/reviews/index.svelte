<script lang="ts">
  import { user } from "$lib/authentication";
  import { request, REVIEWS_LIST_FNAME } from "$lib/repositories";

  let name: string = "Reviews";

  const reviews = request($user, REVIEWS_LIST_FNAME);
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
