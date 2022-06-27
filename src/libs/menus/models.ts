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
