<script lang="ts">
  import Header from "$lib/layouts/header.svelte";
  import Main from "$lib/layouts/main.svelte";
  import Footer from "$lib/layouts/footer.svelte";

  import { user, isSignin } from "$lib/authentication";

  import "../app.css";
</script>

<svelte:head>
  <title>Deliveriers</title>
  <meta name="description" content="hello" />
</svelte:head>

<div class="flex flex-col h-full">
  <Header />

  <Main isSignin={$isSignin}>
    <slot />
  </Main>

  <Footer />
</div>
