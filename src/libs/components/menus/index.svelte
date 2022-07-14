<script lang="ts">
  import { formatDate } from "$lib/utils/date";

  import type { StoreGet } from "$mongodb/models/store";
  import Container from "./container.svelte";

  export let store: StoreGet;
</script>

<Container>
  {#each store.menus as menu}
    <div class="flex flex-row justify-between border-b my-2 pb-2">
      <div class="mx-3 w-28 flex-none flex flex-col justify-start items-start">
        <h2>
          {menu.name} ({#if menu.prices.length > 0}{menu.prices[menu.prices.length - 1]}฿{/if})
        </h2>
        <span class="text-sm">{formatDate(new Date(menu.create_at), { format: "short" })}</span>
      </div>
      <div class="flex-1 flex flex-col">
        {#if menu.reviews.length > 0}
          {#each menu.reviews as review}
            <div class="my-2 first:mt-0 last:mb-0 flex flex-col">
              <div class="flex justify-between">
                <span class="text-lg font-bold">{review.title}</span>
                <span>({review.rating})</span>
              </div>
              <p class="text-sm whitespace-pre-wrap">{review.comment}</p>
            </div>
          {/each}
        {:else}
          <span>-</span>
        {/if}
      </div>
    </div>
  {/each}
</Container>
