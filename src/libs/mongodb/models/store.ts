import type { App } from "./app";
import type { ReviewGet } from "./review";
import type { Menu } from "./menu";

export interface Store {
  _id: string;
  name: string;
  app_ids: string[];
  menu_ids: string[];
  review_ids: string[];
  create_at: string;
}

export interface StoreList {
  _id: string;
  name: string;
  rating: number;
  apps: App[];
  create_at: string;
}

export interface StoreGet {
  _id: string;
  name: string;
  rating: number;
  apps: App[];
  menus: Menu[];
  reviews: ReviewGet[];
  create_at: string;
}
