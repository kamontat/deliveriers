<script lang="ts">
  import { page } from "$app/stores";

  import Loading from "$components/loading.svelte";
  import ErrorMessage from "$components/error.svelte";
  import SelectionMenus from "$components/menus/selection.svelte";

  import { user } from "$lib/authentication";
  import { FNAME_MENUS_ADD, FNAME_REVIEWS_ADD, FNAME_STORES_GET } from "$mongodb/constants";
  import { refreshCache, request } from "$mongodb/client";
  import type { ReviewAddResponse } from "$lib/mongodb/models/reviewAdd";
  import { gotoStore } from "$lib/routes";

  const noCache = { cache: false };
  const ratings = [
    { name: "Very good", value: 5 },
    { name: "Good", value: 4 },
    { name: "So-so", value: 3 },
    { name: "Bad", value: 2 },
    { name: "Very bad", value: 1 },
  ];

  let storeId = $page.url.searchParams.get("storeId") as string;
  let menuIds = $page.url.searchParams.getAll("menuIds").reduce((prev, current) => {
    prev[current] = true;
    return prev;
  }, {} as Record<string, boolean>); // preselect menus
  let title = $page.url.searchParams.get("title") as string;
  let comment = $page.url.searchParams.get("comment") as string;
  let rating = (() => {
    const r = $page.url.searchParams.get("rating") as string;
    const rNumber = parseInt(r);
    if (isFinite(rNumber)) return rNumber;
    else return 3;
  })();

  let store = request($user, FNAME_STORES_GET, { id: storeId });
  const refreshing = () => {
    store = refreshCache($user, FNAME_STORES_GET, { id: storeId });
  };

  const reloadMenu = () => {
    return refreshCache($user, FNAME_STORES_GET, { id: storeId })?.then((store) => {
      return store.status === "SUCCESS" ? store.response.menus : [];
    });
  };

  const createMenu = (name: string, price: number) => {
    return request(
      $user,
      FNAME_MENUS_ADD,
      {
        storeId,
        name,
        prices: [price],
      },
      noCache
    );
  };

  let creatingReview: Promise<ReviewAddResponse> | undefined;
  const createReview = () => {
    creatingReview = request(
      $user,
      FNAME_REVIEWS_ADD,
      {
        storeId,
        menuIds: Object.keys(menuIds).filter((id) => menuIds[id] === true),
        rating,
        title,
        comment,
      },
      noCache
    );
  };
</script>

<div class="flex flex-col flex-1 mt-1 h-full">
  {#if store}
    {#await store}
      <Loading />
    {:then { status, response }}
      {#if status === "SUCCESS"}
        <h1 on:click={refreshing} class="text-xl mb-3">New Review</h1>
        <div class="flex items-center mb-3">
          <label class="w-20" for="storeId">Store</label>
          <input
            class="flex-1 ml-3 py-1 px-3 bg-gray-200 border-2 border-gray-300 rounded-md shadow-sm"
            id="storeId"
            name="storeId"
            value={response.name}
            readonly
          />
        </div>
        <div class="flex items-center mb-3">
          <label class="w-20" for="reviewRating">Rating</label>

          <select
            bind:value={rating}
            id="reviewRating"
            name="reviewRating"
            class="flex-1 ml-3 py-1 px-3 border-2 border-gray-300 rounded-md shadow-sm"
          >
            {#each ratings as rating}
              <option value={rating.value}>
                {rating.name}
              </option>
            {/each}
          </select>
        </div>
        <div class="flex items-center mb-3">
          <label class="w-20" for="reviewTitle">Title</label>
          <input
            bind:value={title}
            class="flex-1 ml-3 py-1 px-3 border-2 border-gray-300 rounded-md shadow-sm"
            id="reviewTitle"
            name="reviewTitle"
          />
        </div>

        <div class="flex items-start">
          <label class="w-20" for="reviewComment">Comment</label>
          <textarea
            bind:value={comment}
            class="flex-1 ml-3 py-1 px-3 border-2 border-gray-300 rounded-md shadow-sm"
            id="reviewComment"
            name="reviewComment"
          />
        </div>
        <div class="mt-5 flex flex-col">
          <SelectionMenus
            bind:select={menuIds}
            menus={response.menus}
            reload={reloadMenu}
            createCallback={createMenu}
          />
        </div>

        <div class="border mt-5 mb-1" />
        <div class="flex justify-center my-5">
          {#if creatingReview}
            {#await creatingReview}
              <Loading />
            {:then review}
              <button on:click={createReview} type="button" class="underline mx-1">Submit</button>
              <button on:click={() => gotoStore(storeId)} class="underline mx-1">Open store</button>
            {:catch error}
              <ErrorMessage
                message={error.message}
                actionName="Try again"
                action={() => (creatingReview = undefined)}
              />
            {/await}
          {:else}
            <button on:click={createReview} type="button" class="underline">Submit</button>
          {/if}
        </div>
      {:else}
        <ErrorMessage
          code="400"
          message={response}
          actionName="refresh"
          action={() => (store = refreshCache($user, FNAME_STORES_GET, { id: storeId }))}
        />
      {/if}
    {/await}
  {/if}
</div>
