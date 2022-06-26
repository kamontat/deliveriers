<script lang="ts">
  import { browser } from "$app/env";
  import { goto } from "$app/navigation";

  import { isSignin, signout } from "$lib/authentication";

  let name = "Deliveriers";

  // Redirect on client side
  $: {
    if (!$isSignin && browser) {
      goto("/signin");
    }
  }

  const _signout = async () => {
    await signout();
  };
</script>

<h1>Welcome to {name} website</h1>
<button on:click={_signout}>Signout </button>
<ul>
  <li>Enter new review: <a href="/review">here</a></li>
  <li>View all reviews: <a href="/reviews">here</a></li>
</ul>
