<script lang="ts">
  import Heart from "$components/icons/heart.svelte";

  const repository = __REPOSITORY__;
  const version = __VERSION__ ?? "version";
</script>

<footer class="flex-none bg-gray-800 text-gray-200 h-28 px-5 py-4">
  <div class="flex flex-col justify-center items-center h-full">
    <span>Made with <Heart /></span>
    <div class="flex-1">
      <span class="px-3"><a class="underline" href={repository} target="_blank">Github</a></span>
      <span class="px-3">{version}</span>
    </div>
  </div>
</footer>
