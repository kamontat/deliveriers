<script lang="ts">
  import { page } from "$app/stores";

  let storeId = $page.url.searchParams.get("storeId") ?? undefined;
  let menuIds = $page.url.searchParams.getAll("menuIds");
</script>

<div>
  Create review for {storeId} on menus {menuIds.join(",")}
</div>
