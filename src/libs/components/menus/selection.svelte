<script lang="ts">
  import type { MenuGet } from "$lib/mongodb/models/menu";

  import Loading from "$components/loading.svelte";
  import ErrorMessage from "$components/error.svelte";

  // list of all menus
  export let menus: MenuGet[];

  // selected menus
  export let select: Record<string, boolean>;
  menus.forEach((menu) => (select[menu._id] = select[menu._id] ?? false));

  let create: Promise<unknown> = new Promise((res) => res(undefined));
  export let createCallback: (name: string, price: number) => Promise<unknown> | undefined;

  export let reload: () => Promise<MenuGet[]> | undefined;

  let menuName: string;
  let menuPrice: number;

  const onCreate = () => {
    try {
      const result = createCallback(menuName, menuPrice);
      if (result)
        create = result
          .then(() => reload())
          .then((m) => m && (menus = m))
          .then(() => ((menuName = ""), (menuPrice = 0)));
    } catch (e: unknown) {
      const error = e as Error;
      return new Promise((_, rej) => rej(error));
    }
  };
</script>

<h3 class="text-lg text-start">Menus</h3>
<div class="border mb-1" />

<div class="flex flex-col">
  {#each menus as menu}
    <div class="flex justify-start mt-3">
      <input class="w-5 mr-3" type="checkbox" bind:checked={select[menu._id]} />
      <input class="flex-1 py-1 px-2 border-2 border-gray-300 rounded-md shadow-sm" value={menu.name} readonly />
      {#if menu.prices.length > 0}
        <input
          class="w-14 ml-3 py-1 px-2 border-2 border-gray-300 rounded-md shadow-sm"
          value={menu.prices[menu.prices.length - 1] + "฿"}
          readonly
        />
      {/if}
    </div>
  {/each}
</div>

<div class="border mt-5" />
<div class="mt-3 flex flex-col w-full h-full">
  {#await create}
    <Loading />
  {:then _}
    <div class="flex justify-start">
      <input
        bind:value={menuName}
        placeholder="Menu name"
        class="flex-1 py-1 px-2 border-2 border-gray-300 rounded-md shadow-sm"
      />
      <input
        bind:value={menuPrice}
        type="number"
        placeholder="Price"
        class="flex-none w-20 ml-2 py-1 px-2 border-2 border-gray-300 rounded-md shadow-sm"
      />
    </div>
    <div class="flex-none flex justify-end">
      <button on:click={onCreate} class="mt-2 px-2 py-1 border-2 border-gray-300 rounded-md shadow-sm" type="button">
        New menu
      </button>
    </div>
  {:catch error}
    <ErrorMessage
      message={error.message}
      actionName="Try again"
      action={() => (create = new Promise((res) => res(undefined)))}
    />
  {/await}
</div>
