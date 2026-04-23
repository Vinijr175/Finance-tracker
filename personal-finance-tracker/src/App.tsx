import { Layout } from './components/layout/Layout';
import { SummaryCards } from './components/finance/SummaryCards';
import { TransactionForm } from './components/finance/TransactionForm';
import { TransactionList } from './components/finance/TransactionList';
import { SpendingChart } from './components/finance/SpendingChart';
import { useTransactions } from './hooks/useTransactions';

function App() {
  const { 
    summary, 
    transactions, 
    addTransaction, 
    deleteTransaction, 
    expenseData, 
    incomeData 
  } = useTransactions();

  return (
    <Layout>
      <section style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ color: '#0f172a', marginBottom: '2.5rem', textAlign: 'center', fontWeight: 800 }}>
          Personal Finance Insights
        </h2>
        
        <SummaryCards summary={summary} />

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem', 
          marginTop: '2rem' 
        }}>
          <SpendingChart data={expenseData} title="Expenses by Category" />
          <SpendingChart data={incomeData} title="Income Sources" />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '3rem', 
          marginTop: '3.5rem',
          alignItems: 'start' 
        }}>
          <TransactionForm onAdd={addTransaction} />
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </div>
      </section>
    </Layout>
  );
}

export default App;
