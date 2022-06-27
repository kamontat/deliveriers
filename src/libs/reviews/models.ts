import type { App } from "$lib/apps/models";
import type { Menu } from "$lib/menus/models";
import type { Store } from "$lib/stores/models";

export interface Review {
  id: string;
  star: number;
  description: string;
  menu: Menu;
  store: Store;
  apps: App[];
  createAt: string;
}

export interface Reviews {
  /**
   * total row from database
   */
  total: number;
  rows: Review[];
}
