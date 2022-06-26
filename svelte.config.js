import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

// Default configuration is https://kit.svelte.dev/docs/configuration
/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    files: {
      assets: "static",
      hooks: "src/hooks",
      lib: "src/libs",
      params: "src/params",
      routes: "src/routes",
      serviceWorker: "src/service-worker",
      template: "src/app.html",
    },
  },
};

export default config;
