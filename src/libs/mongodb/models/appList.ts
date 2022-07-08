import type { App } from "./app";

export interface AppListArgs {
  limit?: number;
  name?: string;
}

export interface AppListResponse {
  total: number;
  rows: App[];
}
