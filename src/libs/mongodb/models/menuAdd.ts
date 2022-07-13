export interface MenuAddArgs {
  storeId: string;
  name: string;
  prices?: number[];
  reviewIds?: string[];
  createAt?: Date;
}

export interface MenuAddResponse {
  // If false, meaning adding to store failed
  success: boolean;
  id: string;
}
