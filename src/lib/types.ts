export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category: string | null;
}

export interface Category {
  name: string;
  emoji: string;
  color: string;
  bg: string;
}
