<script lang="ts">
  import { getUsername, user, isSignin } from "$lib/authentication";

  export let onSignin: () => void;
  export let onSignout: () => void;
  export let errorMessage: string = "";
  export let email: string = "";
  export let password: string = "";
  export let loading: boolean;

  // https://github.com/sveltejs/svelte/issues/4122#issuecomment-611551849
  const bindingEmail: svelte.JSX.FormEventHandler<HTMLInputElement> = (event) => {
    if (email !== event.currentTarget.value) email = event.currentTarget.value;
  };

  // https://github.com/sveltejs/svelte/issues/4122#issuecomment-611551849
  const bindingPassword: svelte.JSX.FormEventHandler<HTMLInputElement> = (event) => {
    if (password !== event.currentTarget.value) password = event.currentTarget.value;
  };
</script>

<header name="mobile" class="flex flex-col justify-start bg-gray-800 text-gray-200 px-2 py-3">
  {#if $isSignin}
    <div class="flex flex-row justify-between items-start px-2">
      <a href="/" class="flex my-auto">Deliveriers</a>
      {#if $isSignin}
        <div class="flex justify-center content-center px-2">
          <span class="px-2 my-auto">@{getUsername($user)}</span>
          <button
            type="button"
            class="underline disabled:no-underline disabled:text-gray-400"
            on:click={onSignout}
            disabled={loading}>Signout</button
          >
        </div>
      {/if}
    </div>
  {:else}
    <div class="flex flex-col mx-2 my-3">
      <a href="/" class="flex my-auto mb-3">Deliveriers</a>
      <div class="flex flex-col">
        <input
          class="py-1 px-2 my-2 rounded-md text-gray-900 outline-none border border-gray-300 focus:border-sky-600"
          type="text"
          placeholder="Enter your email"
          bind:value={email}
          on:change={bindingEmail}
        />
        <input
          class="py-1 px-2 my-2 rounded-md text-gray-900 outline-none border-2 border-gray-300 focus:border-sky-600"
          type="password"
          placeholder="Enter your password"
          bind:value={password}
          on:change={bindingPassword}
        />
        {#if errorMessage}
          <span class="text-sm">{errorMessage}</span>
        {/if}
        <div class="flex justify-end">
          <button
            type="button"
            class="underline disabled:no-underline mt-2 disabled:text-gray-400"
            on:click={onSignin}
            disabled={loading}>Signin</button
          >
        </div>
      </div>
    </div>
  {/if}
</header>
