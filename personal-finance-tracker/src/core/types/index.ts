export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string; 
  type: TransactionType;
  categoryId: string;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
