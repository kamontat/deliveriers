export interface Review {
  _id: string;
  rating: number;
  title: string;
  comment: string;
  store_id: string;
  menu_ids?: string[];
  create_at: string;
}
