<script lang="ts" context="module">
  import { user } from "$lib/authentication";
</script>

<script lang="ts">
  import { getUsername } from "$lib/authentication";

  let name: string = "";
  user.subscribe((u) => (name = getUsername(u)));
</script>

<svelte:head>
  <meta name="description" content="hello" />
</svelte:head>

<h1>Hello {name}</h1>
<slot />
