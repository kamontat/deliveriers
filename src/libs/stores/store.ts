import type { Stores } from "./models";

import { writable } from "svelte/store";

export const stores = writable<Stores>({
  total: 0,
  rows: [],
});
