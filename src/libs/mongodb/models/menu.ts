import type { Review } from "./review";

export interface Menu {
  _id: string;
  name: string;
  prices: number[];
  review_ids: string[];
  create_at: string;
}

export interface MenuGet {
  _id: string;
  name: string;
  prices: number[];
  reviews: Review[];
  create_at: string;
}
