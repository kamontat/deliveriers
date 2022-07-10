export interface StoreAddArgs {
  name: string;
  appIds?: string[];
  menuIds?: string[];
  reviewIds?: string[];
  createAt?: Date;
}

export interface StoreAddResponse {
  id: string;
}
