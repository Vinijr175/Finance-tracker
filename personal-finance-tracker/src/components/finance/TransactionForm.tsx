import React, { useState } from 'react';
import styles from './TransactionForm.module.css';
import { CATEGORIES } from '../../core/constant/categories.ts';
import { validateTransaction } from '../../core/utils/validation';
import type { Transaction } from '../../core/types';
import { v4 as uuidv4 } from 'uuid'; // Pro way to generate unique IDs

interface Props {
  onAdd: (transaction: Transaction) => void;
}

export const TransactionForm: React.FC<Props> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [categoryId, setCategoryId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newData: Partial<Transaction> = {
      description,
      amount: parseFloat(amount),
      date,
      type,
      categoryId
    };

    
    const result = validateTransaction(newData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }


    onAdd({
      ...newData,
      id: uuidv4(),
    } as Transaction);

    
    setDescription('');
    setAmount('');
    setCategoryId('');
    setErrors({});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Add Transaction</h3>
      
      <div className={styles.typeSwitch}>
        <button 
          type="button" 
          className={type === 'expense' ? styles.activeExpense : ''} 
          onClick={() => setType('expense')}
        >Expense</button>
        <button 
          type="button" 
          className={type === 'income' ? styles.activeIncome : ''} 
          onClick={() => setType('income')}
        >Income</button>
      </div>

      <div className={styles.inputGroup}>
        <input 
          placeholder="Description (e.g. Monthly Rent)" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        {errors.description && <span className={styles.error}>{errors.description}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <input 
            type="number" 
            placeholder="Amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
          {errors.amount && <span className={styles.error}>{errors.amount}</span>}
        </div>

        <div className={styles.inputGroup}>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select Category</option>
          {CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
          ))}
        </select>
        {errors.categoryId && <span className={styles.error}>{errors.categoryId}</span>}
      </div>

      <button type="submit" className={styles.submitBtn}>Save Transaction</button>
    </form>
  );
};
