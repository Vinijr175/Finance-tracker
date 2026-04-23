import React from 'react';
import styles from './TransactionList.module.css';
import type { Transaction } from '../../core/types';
import { CATEGORIES } from '../../core/constant/categories';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}


export const TransactionList: React.FC<Props> = ({ transactions, onDelete }) => {
  
  const getCategory = (id: string) => 
    CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];

  if (transactions.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No activity yet. Add a transaction to get started! 💸</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Recent Activity</h3>
      <div className={styles.list}>
        {transactions.map((t) => {
          const cat = getCategory(t.categoryId);
          return (
            <div key={t.id} className={styles.item}>
              <div className={styles.info}>
                <div 
                  className={styles.icon} 
                  style={{ background: `${cat.color}15`, color: cat.color }}
                >
                  {cat.icon}
                </div>
                <div>
                  <p className={styles.description}>{t.description}</p>
                  <span className={styles.meta}>{t.date} • {cat.label}</span>
                </div>
              </div>
              <div className={styles.actions}>
                <span className={t.type === 'income' ? styles.income : styles.expense}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </span>
                <button 
                  onClick={() => onDelete(t.id)} 
                  className={styles.deleteBtn}
                  aria-label="Delete transaction"
                >
                  &times;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
