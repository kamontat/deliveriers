import type { Review } from "./review";

export interface Menu {
  _id: string;
  name: string;
  price: number;
  create_at: string;
}

export interface MenuWithReviews extends Menu {
  reviews: Review[];
}
