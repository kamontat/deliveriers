<script lang="ts">
  import type { StoreListSorting } from "$mongodb/models/storeList";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import DashboardContainer from "$components/dashboard/container.svelte";
  import DashboardCards from "$components/dashboard/cards.svelte";
  import DashboardCard from "$components/dashboard/card.svelte";
  import Loading from "$components/loading.svelte";

  import { user } from "$lib/authentication";
  import { refreshCache, request } from "$mongodb/client";
  import { FNAME_APPS_LIST, FNAME_STORES_LIST } from "$mongodb/constants";
  import { silentUpdateQuery } from "$lib/utils/url";

  const name = "Stores";
  const ratings = [
    { name: "Very good", value: 5 },
    { name: "Good", value: 4 },
    { name: "So-so", value: 3 },
    { name: "Bad", value: 2 },
    { name: "Very bad", value: 1 },
  ];
  const sortings = [
    { name: "By date", value: "create_at" },
    { name: "By name", value: "name" },
    { name: "By rating", value: "rating" },
  ];

  // TODO: merge alls filters to object instead
  // TODO: add hot-reload if data is already on cache

  const parameters = $page.url.searchParams;
  let storeNameFilter = parameters.get("qName") ?? undefined;
  let appIdsFilter = parameters.getAll("qAppIds");
  let ratingsFilter = parameters
    .getAll("qRatings")
    .map((v) => parseInt(v))
    .filter(isFinite);
  let sortingFilter = (parameters.get("qSortName") as StoreListSorting) ?? "create_at";
  let ascendingFilter = parameters.get("qAscending") === "true";

  let advanceMode = false;

  let apps = request($user, FNAME_APPS_LIST);
  let stores = request($user, FNAME_STORES_LIST, {
    name: storeNameFilter,
    appIds: appIdsFilter,
    ratings: ratingsFilter,
    sortName: sortingFilter,
    ascending: ascendingFilter,
  });

  const searchStore = () => {
    stores = request($user, FNAME_STORES_LIST, {
      name: storeNameFilter,
      appIds: appIdsFilter,
      ratings: ratingsFilter,
      sortName: sortingFilter,
      ascending: ascendingFilter,
    });

    silentUpdateQuery({
      qName: storeNameFilter,
      qAppIds: appIdsFilter,
      qRatings: ratingsFilter,
      qSortName: sortingFilter,
      qAscending: ascendingFilter,
    });
  };

  const refreshing = () => {
    apps = refreshCache($user, FNAME_APPS_LIST);
    stores = refreshCache($user, FNAME_STORES_LIST, {
      name: storeNameFilter,
      appIds: appIdsFilter,
      ratings: ratingsFilter,
      sortName: sortingFilter,
      ascending: ascendingFilter,
    });
  };

  const onView = (id: string) => {
    return () => goto(`/store/${id}`);
  };

  const onReview = (id: string) => {
    return () => goto(`/review?storeId=${id}`);
  };
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<div class="flex flex-col h-full">
  <div class="flex flex-col my-2">
    <div class="flex space-x-5">
      <div class="flex flex-1 items-center">
        <h1 class="text-xl leading-5">Stores</h1>
        {#if stores}
          {#await stores then stores}
            <span class="ml-2 text-xl leading-5">({stores?.total})</span>
          {/await}
        {/if}
      </div>

      <button class="flex-none underline text-lg">Create</button>
    </div>

    <div class="flex flex-col md:flex-row mt-4">
      <input
        class="flex-1 md:mr-5 mt-1 py-1 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
        placeholder="store name"
        bind:value={storeNameFilter}
        on:keydown={(event) => event.key === "Enter" && searchStore()}
      />

      <div class="flex justify-center md:justify-start space-x-5 mt-4 md:mt-0">
        <button class="flex-none underline" on:click={() => (advanceMode = !advanceMode)}>Advance</button>
        <button class="flex-none underline" on:click={searchStore}>Search</button>
        <button class="flex-none underline" on:click={refreshing}>Refresh</button>
      </div>
    </div>

    <!-- Advance mode -->
    <div class="flex flex-col items-stretch mt-4" class:hidden={advanceMode === false}>
      {#if apps}
        <div class="my-1">
          <h2>Applications</h2>
          <div class="flex flex-wrap">
            {#await apps}
              <span class="inline-flex self-center">loading...</span>
            {:then apps}
              {#each apps.rows as row}
                <label class="mx-1 my-1">
                  <input type="checkbox" bind:group={appIdsFilter} value={row._id.toString()} />
                  {row.name}
                </label>
              {/each}
            {/await}
          </div>
        </div>
      {/if}
      <div class="my-1">
        <h2>Rating</h2>
        <div class="flex flex-wrap">
          {#each ratings as rating}
            <label class="mx-1 my-1">
              <input type="checkbox" bind:group={ratingsFilter} value={rating.value} />
              {rating.name}
            </label>
          {/each}
        </div>
      </div>

      <div class="my-1">
        <h2>Sorting</h2>
        <div class="flex">
          <select title="sorting" class="flex-1 w-full mx-1 my-1 py-1 border rounded" bind:value={sortingFilter}>
            {#each sortings as sorting}
              <option value={sorting.value}>{sorting.name}</option>
            {/each}
          </select>
          <button class="flex-none underline" on:click={() => (ascendingFilter = !ascendingFilter)}
            >{ascendingFilter ? "Ascending" : "Descending"}</button
          >
        </div>
      </div>
    </div>
  </div>

  <DashboardContainer>
    {#if stores}
      {#await stores}
        <Loading />
      {:then stores}
        <DashboardCards>
          {#each stores.rows as row}
            <DashboardCard
              id={row._id}
              title={row.name}
              rating={row.rating}
              tags={row.apps.map((a) => a.name)}
              createAt={new Date(row.create_at)}
              {onView}
              {onReview}
            />
          {/each}
        </DashboardCards>
      {/await}
    {/if}
  </DashboardContainer>
</div>

<!-- 
<h1>Recent stores</h1>

{#if apps && stores}
  {#await apps}
    <p>loading...</p>
  {:then apps}
    {apps.total}
    {#each apps.rows as row}
      <p id={row.id}>{row.name}</p>
    {/each}
  {/await}

  {#await stores}
    <p>loading...</p>
  {:then stores}
    {stores.total}
    {#each stores.rows as row}
      <p id={row.id}>{row.name} - {row.apps.map((a) => a.name)}</p>
    {/each}
  {/await}
{/if} -->
