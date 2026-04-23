import { useState, useEffect, useMemo } from 'react';
import type  { Transaction, FinanceSummary } from '../core/types';
import { StorageService } from '../services/storage.service';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);


  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await StorageService.getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Could not load data from server", error);
      }
    };
    loadData();
  }, []);

  const addTransaction = async (t: Transaction) => {
    setTransactions([t, ...transactions]);
    
    try {
      await StorageService.saveTransaction(t);
    } catch (error) {
      console.error("Failed to save to server", error);
    }
  };

  const deleteTransaction = async (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
    try {
      await StorageService.deleteTransaction(id);
    } catch (error) {
      console.error("Failed to delete from server", error);
    }
  };

  const summary: FinanceSummary = useMemo(() => {
    return transactions.reduce((acc, t) => {
      if (t.type === 'income') acc.totalIncome += t.amount;
      else acc.totalExpense += t.amount;
      acc.balance = acc.totalIncome - acc.totalExpense;
      return acc;
    }, { totalIncome: 0, totalExpense: 0, balance: 0 });
  }, [transactions]);

  const expenseData = useMemo(() => {
    const categories = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc: Record<string, number>, t) => {
        acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
        return acc;
      }, {});
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const incomeData = useMemo(() => {
    const categories = transactions
      .filter(t => t.type === 'income')
      .reduce((acc: Record<string, number>, t) => {
        acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
        return acc;
      }, {});
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  return {
    transactions,
    summary,
    expenseData,
    incomeData,
    addTransaction,
    deleteTransaction
  };
};
