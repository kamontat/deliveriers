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

export interface StoreAddArgs {
  name: string;
  appIds?: string[];
  createAt?: Date;
}

export interface StoreListArgs {
  limit?: number;
  name?: string;
  appName?: string;
}
