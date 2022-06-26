<script lang="ts">
  import { isSignin, protectedRoute, signout } from "$lib/authentication";

  let name = "Deliveriers";

  // Redirect on client side
  $: protectedRoute();

  const _signout = async () => {
    await signout();
  };
</script>

<h1>Welcome to {name} website</h1>
{#if $isSignin}
  <button on:click={_signout}>Signout </button>
{/if}

<ul>
  <li>Enter new review: <a href="/review">here</a></li>
  <li>View all reviews: <a href="/reviews">here</a></li>
</ul>
