<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import ErrorMessage from "$components/error.svelte";

  export const load: Load = ({ error, status }) => {
    return {
      props: {
        code: status,
        message: error?.message,
      },
    };
  };
</script>

<script lang="ts">
  export let code: string;
  export let message: string;
</script>

<ErrorMessage {code} {message} />
