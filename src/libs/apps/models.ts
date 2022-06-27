export interface App {
  id: string;
  name: string;
}

export interface Apps {
  total: number;
  rows: App[];
}
