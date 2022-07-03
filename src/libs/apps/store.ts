import type { Apps } from "./models";

import { writable } from "svelte/store";

export const apps = writable<Apps>({
  total: 0,
  rows: [],
});
