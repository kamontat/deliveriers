export interface Menu {
  id: string;
  name: string;
  price: number;
  createAt: string;
}

export interface Menus {
  total: number;
  rows: Menu[];
}

export interface MenuAddArgs {
  name?: string;
  price?: number;
  createAt?: Date;
}

export interface MenuListArgs {
  limit?: number;
  name?: string;
}
