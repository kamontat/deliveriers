import type { StoreList } from "./store";

export type StoreListSorting = "create_at" | "name" | "rating";

export interface StoreListArgs {
  limit?: number;
  name?: string;
  appIds?: string[];
  ratings?: number[];
  sortName?: StoreListSorting;
  ascending?: boolean;
}

export interface StoreListResponse {
  total: number;
  rows: StoreList[];
}
