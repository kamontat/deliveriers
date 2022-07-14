export interface ReviewAddArgs {
  storeId: string;
  menuIds: string[];
  rating: number;
  title: string;
  comment: string;
  createAt?: Date;
}

export interface ReviewAddResponse {
  // If false, meaning adding to dependencies failed
  success: boolean;
  // review id
  id: string;
}
