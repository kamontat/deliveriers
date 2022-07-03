<script lang="ts">
  import { user } from "$lib/authentication";
  import { request, STORES_LIST_FNAME } from "$lib/repositories";

  const name: string = "Stores";
  const stores = request($user, STORES_LIST_FNAME);
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<h1>View all stores</h1>

{#if stores}
  {#await stores}
    <p>loading...</p>
  {:then stores}
    {stores.total}
    {#each stores.rows as row}
      <p id={row.id}>{row.name} - {row.apps.map((a) => a.name)}</p>
    {/each}
  {/await}
{/if}
