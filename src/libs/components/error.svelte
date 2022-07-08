<script lang="ts">
  type Callback = () => void;

  import Stop from "$components/icons/stop.svelte";

  export let code: string | undefined = undefined;
  export let message: string = "something went wrong, please try again";
  export let back: Callback | undefined = undefined;
</script>

<div class="flex flex-col justify-center items-center h-full">
  <Stop />
  <p class="text-center">
    {message}

    {#if code}
      <span class="font-bold">({code})</span>
    {/if}
  </p>
  {#if back}
    <button class="underline" on:click={back}>Back</button>
  {/if}
</div>
