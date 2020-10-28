export interface LineItem {
  name: string;
  amount: number;
  currency: string;
  quantity: number;
  images?: string[];
  description?: string;
}
