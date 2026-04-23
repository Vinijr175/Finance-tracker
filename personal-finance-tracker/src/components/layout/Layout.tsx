import React from 'react';
import styles from './Layout.module.css';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>Finance<span>Tracker</span></h1>
          
        </div>
      </header>
      
      <main className={styles.container}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} • Production-Ready Finance Tracker</p>
      </footer>
    </div>
  );
};
