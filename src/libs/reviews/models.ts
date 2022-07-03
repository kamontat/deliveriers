import type { App } from "$lib/apps";
import type { Menu } from "$lib/menus";
import type { Store } from "$lib/stores";

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

export interface ReviewAddArgs {
  star: number;
  description: string;
  menuId: string;
  storeId: string;
  createAt?: Date;
}

export interface ReviewListArgs {
  limit?: number;
  star?: number[] | number;
  description?: string;
  appName?: string;
  storeName?: string;
  menuName?: string;
}
