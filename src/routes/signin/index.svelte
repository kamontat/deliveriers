<script lang="ts">
  import { goto } from "$app/navigation";
  import { signin } from "$lib/authentication";

  let name: string = "Signin Page";
  let submitAction: Promise<void>;
  let email: string;
  let password: string;

  const _signin = () => {
    submitAction = signin(email, password);
  };
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<h1>Sign in</h1>

<p>
  <input type="text" placeholder="Enter your email" bind:value={email} />
  <input type="password" placeholder="Enter your password" bind:value={password} />
  <button on:click={_signin}>Signin</button>
</p>

{#if submitAction !== undefined}
  {#await submitAction}
    <p>signing in...</p>
  {:then}
    {goto("/")}
  {:catch error}
    <p>{error.message}</p>
  {/await}
{/if}
