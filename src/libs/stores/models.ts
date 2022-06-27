import type { App } from "$lib/apps";

export interface Store {
  id: string;
  name: string;
  apps: App[];
  createAt: string;
}

export interface Stores {
  total: number;
  rows: Store[];
}
