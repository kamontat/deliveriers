import type { App } from "./app";
import type { Review } from "./review";
import type { MenuGet } from "./menu";

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
  rating: number | null;
  apps: App[];
  create_at: string;
}

export interface StoreGet {
  _id: string;
  name: string;
  storeRating: number | null;
  menuRating: number | null;
  apps: App[];
  menus: MenuGet[];
  reviews: Review[];
  create_at: string;
}
