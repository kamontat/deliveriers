import type { RealmUser } from "$lib/authentication/models";

import { app } from "./constants";
import { derived, writable } from "svelte/store";

export const user = writable<RealmUser | undefined | null>(app.currentUser);
export const isSignin = derived(user, (u) => u !== undefined && u !== null);
