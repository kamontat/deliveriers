<script lang="ts">
  import ErrorMessage from "$lib/components/error.svelte";

  export let isSignin: boolean;
</script>

<main class="flex-auto container mx-auto px-3 py-4">
  {#if isSignin}
    <slot />
  {:else}
    <ErrorMessage message="Permission denied" />
  {/if}
</main>
