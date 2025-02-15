import React from 'react';
import { WalletContext } from '.';
import { Transaction } from '../../types/transaction.types';
import { getTransactions } from '../../api/transaction.api';

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  const refreshTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WalletContext.Provider value={{ 
      balance, 
      updateBalance, 
      isLoading, 
      setIsLoading,
      transactions,
      refreshTransactions
    }}>
      {children}
    </WalletContext.Provider>
  );
};