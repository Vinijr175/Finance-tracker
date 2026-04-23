import type  { Transaction } from '../core/types';

const API_URL = 'http://localhost:5000/api/transactions';

export const StorageService = {
  getTransactions: async (): Promise<Transaction[]> => {
    const response = await fetch(API_URL);
    return await response.json();
  },

  
  saveTransaction: async (transaction: Transaction): Promise<void> => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
  },

  
  deleteTransaction: async (id: string): Promise<void> => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
  }
};
