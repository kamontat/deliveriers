<script lang="ts">
  type Callback = () => void;

  import Stop from "$components/icons/stop.svelte";

  export let code = "";
  export let message = "something went wrong, please try again";

  export let actionName = "";
  export let action: Callback | undefined = undefined;
</script>

<div class="flex flex-col justify-center items-center h-full">
  <Stop />
  <p class="text-center">
    {message}

    {#if code}
      <span class="font-bold">({code})</span>
    {/if}
  </p>
  {#if actionName && action}
    <button class="underline" on:click={action}>{actionName}</button>
  {/if}
</div>
