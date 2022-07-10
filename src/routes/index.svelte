<script lang="ts">
  import type { StoreListSorting } from "$mongodb/models/storeList";

  import { page } from "$app/stores";

  import StoreContainer from "$components/stores/container.svelte";
  import StoreCards from "$components/stores/cards.svelte";
  import StoreCard from "$components/stores/card.svelte";
  import Loading from "$components/loading.svelte";

  import { refreshCache, request, requestCache } from "$mongodb/client";
  import { FNAME_APPS_LIST, FNAME_STORES_LIST } from "$mongodb/constants";

  import { user } from "$lib/authentication";
  import { gotoCreateStore, gotoReview, gotoStore } from "$lib/routes";
  import { silentUpdateQuery } from "$lib/utils/url";

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

  const parameters = $page.url.searchParams;

  let advanceMode = false;
  let filters = {
    name: parameters.get("qName") ?? undefined,
    appIds: parameters.getAll("qAppIds"),
    ratings: parameters.getAll("qRatings").map(parseInt),
    sortName: (parameters.get("qSortName") as StoreListSorting) ?? "create_at",
    ascending: parameters.get("qAscending") === "true",
  };

  let apps = request($user, FNAME_APPS_LIST);
  let stores = request($user, FNAME_STORES_LIST, filters);
  $: {
    const store = requestCache($user, FNAME_STORES_LIST, filters);
    if (store) stores = new Promise((res) => res(store));
  }

  const searchStore = () => {
    stores = request($user, FNAME_STORES_LIST, filters);

    silentUpdateQuery({
      qName: filters.name,
      qAppIds: filters.appIds,
      qRating: filters.ratings,
      qSortName: filters.sortName,
      qAscending: filters.ascending,
    });
  };

  const refreshing = () => {
    apps = refreshCache($user, FNAME_APPS_LIST);
    stores = refreshCache($user, FNAME_STORES_LIST, filters);
  };

  const onView = (id: string) => {
    return () => gotoStore(id);
  };

  const onReview = (id: string) => {
    return () => gotoReview({ storeId: id });
  };
</script>

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

      <button class="flex-none underline text-lg" on:click={gotoCreateStore}>Create</button>
    </div>

    <div class="flex flex-col md:flex-row mt-4">
      <input
        class="flex-1 md:mr-5 mt-1 py-1 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
        placeholder="store name"
        bind:value={filters.name}
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
                  <input type="checkbox" bind:group={filters.appIds} value={row._id.toString()} />
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
              <input type="checkbox" bind:group={filters.ratings} value={rating.value} />
              {rating.name}
            </label>
          {/each}
        </div>
      </div>

      <div class="my-1">
        <h2>Sorting</h2>
        <div class="flex">
          <select title="sorting" class="flex-1 w-full mx-1 my-1 py-1 border rounded" bind:value={filters.sortName}>
            {#each sortings as sorting}
              <option value={sorting.value}>{sorting.name}</option>
            {/each}
          </select>
          <button
            class="flex-none underline"
            on:click={() => (filters = { ...filters, ascending: !filters.ascending })}
          >
            {filters.ascending ? "Ascending" : "Descending"}</button
          >
        </div>
      </div>
    </div>
  </div>

  <StoreContainer>
    {#if stores}
      {#await stores}
        <Loading />
      {:then stores}
        <StoreCards>
          {#each stores.rows as row}
            <StoreCard
              id={row._id}
              title={row.name}
              rating={row.rating}
              tags={row.apps.map((a) => a.name)}
              createAt={new Date(row.create_at)}
              {onView}
              {onReview}
            />
          {/each}
        </StoreCards>
      {/await}
    {/if}
  </StoreContainer>
</div>
