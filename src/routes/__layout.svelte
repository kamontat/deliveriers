<script lang="ts" context="module">
  import { user, getUsername } from "$lib/authentication";
</script>

<svelte:head>
  <meta name="description" content="hello" />
</svelte:head>

<h1>Hello {getUsername($user)}</h1>
<slot />
