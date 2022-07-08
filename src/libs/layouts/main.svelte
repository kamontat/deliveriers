<script lang="ts">
  import ErrorMessage from "$components/error.svelte";

  import { isSignin } from "$lib/authentication";
</script>

<main class="flex-auto container mx-auto px-3 py-4">
  {#if $isSignin}
    <slot />
  {:else}
    <ErrorMessage message="Permission denied" />
  {/if}
</main>
