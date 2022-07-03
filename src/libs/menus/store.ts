import type { Menus } from "./models";

import { writable } from "svelte/store";

export const menus = writable<Menus>({
  total: 0,
  rows: [],
});
