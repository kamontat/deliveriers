<script lang="ts">
  import { user } from "$lib/authentication";

  import { request } from "$lib/mongodb/client";
  import { FNAME_APPS_LIST, FNAME_STORES_ADD } from "$lib/mongodb/constants";

  let name = "";
  let appIds: string[] = [];

  let apps = request($user, FNAME_APPS_LIST);
  const createStore = async () => {
    const response = await request(
      $user,
      FNAME_STORES_ADD,
      {
        name,
        appIds,
      },
      {
        cache: false,
      }
    );

    console.log(response);
  };
</script>

<h1 class="text-lg">Create new store</h1>
<div class="flex flex-col">
  <div class="flex flex-col items-stretch my-2">
    <input
      name="storeName"
      class="flex-1 md:mr-5 py-1 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm"
      placeholder="store name"
      bind:value={name}
    />
  </div>

  {#if apps}
    <div class="flex flex-wrap">
      {#await apps}
        <span class="inline-flex self-center">loading...</span>
      {:then apps}
        {#each apps.rows as row}
          <label class="mx-1 my-1">
            <input name="appIds" type="checkbox" bind:group={appIds} value={row._id.toString()} />
            {row.name}
          </label>
        {/each}
      {/await}
    </div>
  {/if}

  <button class="mt-2 underline" type="submit" on:click={createStore}>Submit</button>
</div>
