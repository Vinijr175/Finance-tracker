import React from 'react';
import styles from './SummaryCards.module.css';
import type { FinanceSummary } from '../../core/types';
interface Props {
  summary: FinanceSummary;
}

export const SummaryCards: React.FC<Props> = ({ summary }) => {
  // Professional helper to format currency
  const formatValue = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className={styles.grid}>
      <div className={`${styles.card} ${styles.balanceCard}`}>
        <span className={styles.label}>Current Balance</span>
        <h2 className={summary.balance < 0 ? styles.negative : ''}>
          {formatValue(summary.balance)}
        </h2>
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Total Income</span>
        <h2 className={styles.incomeText}>{formatValue(summary.totalIncome)}</h2>
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Total Expenses</span>
        <h2 className={styles.expenseText}>{formatValue(summary.totalExpense)}</h2>
      </div>
    </div>
  );
};
