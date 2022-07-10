<script lang="ts">
  import { page } from "$app/stores";
  import { user } from "$lib/authentication";
  import { FNAME_STORES_GET } from "$lib/mongodb/constants";
  import { request } from "$mongodb/client";

  let storeId = $page.url.searchParams.get("storeId") as string;
  let menuIds = $page.url.searchParams.getAll("menuIds");

  let store = request($user, FNAME_STORES_GET, { id: storeId });
</script>

<div>
  Create review for {storeId} on menus {menuIds.join(",")}
</div>
