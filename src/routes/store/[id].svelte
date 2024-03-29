<script lang="ts">
  type DisplayMode = "reviews" | "menus";

  import ErrorMessage from "$components/error.svelte";
  import MenuList from "$components/menus/index.svelte";
  import ReviewList from "$components/reviews/index.svelte";
  import Loading from "$components/loading.svelte";
  import Circlebar from "$components/circlebar.svelte";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import { user } from "$lib/authentication";
  import { refreshCache, request } from "$mongodb/client";
  import { FNAME_STORES_GET } from "$mongodb/constants";
  import { formatDate } from "$lib/utils/date";
  import { silentUpdateQuery } from "$lib/utils/url";
  import { gotoReview } from "$lib/routes";

  const options = {
    expire: 15 * 60 * 1000,
  };
  const id = $page.params.id;

  let displayMode: DisplayMode = ($page.url.searchParams.get("displayMode") as DisplayMode) ?? "menus";
  let store = request($user, FNAME_STORES_GET, { id }, options);

  const refreshing = () => {
    store = refreshCache($user, FNAME_STORES_GET, { id }, options);
  };

  const onDisplayChange = (name: DisplayMode) => {
    if (displayMode !== name) {
      displayMode = name;
      silentUpdateQuery({ displayMode });
    }
  };
</script>

<div class="flex flex-col flex-1 mt-3 h-full">
  {#if store}
    {#await store}
      <Loading />
    {:then store}
      {#if store.status === "ERROR"}
        <ErrorMessage code="400" message={store.response} actionName="home" action={() => goto("/")} />
      {:else}
        <div class="flex flex-row pb-2">
          <div class="flex-1 flex flex-col items-start">
            <h1 class="text-xl font-bold leading-4">
              <button on:click={refreshing}>{store.response.name}</button>
            </h1>
            <span class="text-xs font-normal">
              {formatDate(new Date(store.response.create_at), { format: "long" })}
            </span>

            <button
              class="mt-3 px-2 py-0.5 text-sm border-2 border-violet-600 rounded-lg"
              on:click={() => gotoReview({ storeId: store.response._id })}
            >
              Review
            </button>
          </div>
          <div class="flex-none flex flex-col justify-center mx-1">
            {#if store?.response?.storeRating}
              <span class="text-center">Store</span>
              <Circlebar progress={store.response.storeRating} minimum={0} maximum={5} suffix="%" />
            {/if}
          </div>
          <div class="flex-none flex flex-col justify-center mx-1">
            {#if store?.response?.menuRating}
              <span class="text-center">Menu</span>
              <Circlebar progress={store.response.menuRating} minimum={0} maximum={5} suffix="%" />
            {/if}
          </div>
        </div>
        <div class="flex justify-center items-center border-b">
          <button
            class="pb-2"
            class:text-indigo-600={displayMode === "menus"}
            class:border-b={displayMode === "menus"}
            class:border-b-indigo-600={displayMode === "menus"}
            on:click={() => onDisplayChange("menus")}
          >
            <span class="mx-2">Menus</span>
          </button>
          <button
            class="pb-2"
            class:text-indigo-600={displayMode === "reviews"}
            class:border-b={displayMode === "reviews"}
            class:border-b-indigo-600={displayMode === "reviews"}
            on:click={() => onDisplayChange("reviews")}
          >
            <span class="mx-2">Reviews</span>
          </button>
        </div>
        <div class="flex-1">
          {#if displayMode === "menus"}
            <MenuList store={store.response} />
          {:else if displayMode === "reviews"}
            <ReviewList store={store.response} />
          {:else}
            <ErrorMessage code="400" message="Invalid display mode" />
          {/if}
        </div>
      {/if}
    {/await}
  {/if}
</div>
