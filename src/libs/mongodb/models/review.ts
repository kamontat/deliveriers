import type { Menu } from "./menu";

export interface Review {
  _id: string;
  rating: number;
  title: string;
  comment: string;
  create_at: string;
}

export interface ReviewGet extends Review {
  menus: Menu[];
}
