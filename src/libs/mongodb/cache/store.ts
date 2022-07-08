import type { RawCache } from "./models";

import { writable } from "svelte/store";

const raw: Record<string, RawCache> = {};

export const cache = writable(raw);
