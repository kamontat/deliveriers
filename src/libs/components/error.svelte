<script lang="ts">
  import Stop from "$lib/icons/stop.svelte";

  export let code: string | undefined = undefined;
  export let message: string = "something went wrong, please try again";
</script>

<div class="flex flex-col justify-center items-center h-full">
  <Stop />
  <p>
    <span>{message}</span>

    {#if code}
      <span>({code})</span>
    {/if}
  </p>
</div>
