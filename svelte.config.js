import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

// https://kit.svelte.dev/faq#read-package-json
const file = fileURLToPath(new URL("package.json", import.meta.url));
const json = readFileSync(file, "utf8");
const pjson = JSON.parse(json);

// Default configuration is https://kit.svelte.dev/docs/configuration
/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    postcss: true,
  }),
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
    vite: {
      define: {
        __VERSION__: JSON.stringify(pjson.version),
        __REPOSITORY__: JSON.stringify(pjson.repository.url),
        __LICENSE__: JSON.stringify(pjson.license),
      },
    },
  },
};

export default config;
