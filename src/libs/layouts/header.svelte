<script lang="ts">
  import DesktopHeader from "$lib/layouts/header-desktop.svelte";
  import MobileHeader from "$lib/layouts/header-mobile.svelte";
  import { signin, signout } from "$lib/authentication";

  let width: number;
  let email: string;
  let password: string;
  let errorMessage: string;
  let loading: boolean = false;

  const _signin = async () => {
    errorMessage = "";
    loading = true;

    try {
      await signin(email, password);
    } catch (err: unknown) {
      errorMessage = (err as Error).message;
    } finally {
      loading = false;
    }
  };

  const _signout = async () => {
    loading = true;
    await signout();
    loading = false;
  };
</script>

<svelte:window bind:innerWidth={width} />

{#if width === undefined}
  <div />
{:else if width < 700}
  <MobileHeader onSignin={_signin} onSignout={_signout} bind:email bind:password bind:errorMessage bind:loading />
{:else}
  <DesktopHeader onSignin={_signin} onSignout={_signout} bind:email bind:password bind:errorMessage bind:loading />
{/if}
