<script lang="ts">
  import { getUsername, isSignin, user } from "$lib/authentication";

  export let onSignin: () => void;
  export let onSignout: () => void;
  export let email = "";
  export let password = "";
  export let errorMessage = "";
  export let loading: boolean;
</script>

<header
  name="desktop"
  class="flex flex-row justify-between items-center flex-none bg-gray-800 text-gray-200 h-16 px-2 py-3"
>
  <div class="px-5">
    <a href="/" class="m-auto">Deliveriers</a>
  </div>
  <form class="flex items-center px-5">
    {#if $isSignin}
      <span class="m-auto">@{getUsername($user)}</span>
      <button
        class="px-5 underline disabled:no-underline disabled:text-gray-400"
        type="button"
        on:click={onSignout}
        disabled={loading}>Signout</button
      >
    {:else}
      {#if errorMessage}
        <span class="text-sm">{errorMessage}</span>
      {/if}
      <input
        class="mx-1 py-1 px-2 rounded-md text-gray-900 outline-none border-2 border-gray-300 focus:border-sky-600"
        class:border-red-500={errorMessage !== ""}
        type="text"
        placeholder="Enter your email"
        bind:value={email}
      />
      <input
        class="mx-1 py-1 px-2 rounded-md text-gray-900 outline-none border-2 border-gray-300 focus:border-sky-600"
        class:border-red-500={errorMessage !== ""}
        type="password"
        placeholder="Enter your password"
        bind:value={password}
      />
      <button
        class="px-5 underline disabled:no-underline disabled:text-gray-400"
        type="submit"
        on:click|preventDefault={onSignin}
        disabled={loading}>Signin</button
      >
    {/if}
  </form>
</header>
