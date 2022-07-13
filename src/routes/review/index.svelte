<script lang="ts">
  import { page } from "$app/stores";

  import Loading from "$components/loading.svelte";
  import ErrorMessage from "$components/error.svelte";
  import SelectionMenus from "$components/menus/selection.svelte";

  import { user } from "$lib/authentication";
  import { FNAME_MENUS_ADD, FNAME_STORES_GET } from "$mongodb/constants";
  import { refreshCache, request } from "$mongodb/client";

  let storeId = $page.url.searchParams.get("storeId") as string;
  let menuIds = $page.url.searchParams.getAll("menuIds").reduce((prev, current) => {
    prev[current] = true;
    return prev;
  }, {} as Record<string, boolean>); // preselect menus

  let store = request($user, FNAME_STORES_GET, { id: storeId });
  const refreshing = () => {
    store = refreshCache($user, FNAME_STORES_GET, { id: storeId });
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
      {
        cache: false,
      }
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
          <label class="w-20" for="reviewTitle">Title</label>
          <input
            class="flex-1 ml-3 py-1 px-3 border-2 border-gray-300 rounded-md shadow-sm"
            id="reviewTitle"
            name="reviewTitle"
          />
        </div>

        <div class="flex items-start">
          <label class="w-20" for="reviewComment">Comment</label>
          <textarea
            class="flex-1 ml-3 py-1 px-3 border-2 border-gray-300 rounded-md shadow-sm"
            id="reviewComment"
            name="reviewComment"
          />
        </div>
        <div class="mt-5 flex flex-col">
          <SelectionMenus menus={response.menus} bind:select={menuIds} createCallback={createMenu} />
        </div>

        <div class="border mt-5 mb-1" />
        <div class="flex justify-center">
          <button type="button" class="underline">Submit</button>
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
